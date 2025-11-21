-- Create table for tracking failed login attempts
CREATE TABLE public.login_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email text NOT NULL,
  attempted_at timestamp with time zone NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text,
  success boolean NOT NULL DEFAULT false
);

CREATE INDEX idx_login_attempts_email ON public.login_attempts(user_email);
CREATE INDEX idx_login_attempts_time ON public.login_attempts(attempted_at);

-- Enable RLS
ALTER TABLE public.login_attempts ENABLE ROW LEVEL SECURITY;

-- Admins can view all login attempts
CREATE POLICY "Admins can view all login attempts"
ON public.login_attempts
FOR SELECT
USING (has_role(auth.uid(), 'admin'));

-- Create table for email verification codes
CREATE TABLE public.verification_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '15 minutes'),
  used boolean NOT NULL DEFAULT false,
  purpose text NOT NULL CHECK (purpose IN ('unlock_account', 'email_verification'))
);

CREATE INDEX idx_verification_codes_user ON public.verification_codes(user_id);
CREATE INDEX idx_verification_codes_code ON public.verification_codes(code);

-- Enable RLS
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Users can view their own verification codes
CREATE POLICY "Users can view their own verification codes"
ON public.verification_codes
FOR SELECT
USING (auth.uid() = user_id);

-- Add account_locked field to profiles
ALTER TABLE public.profiles ADD COLUMN account_locked boolean NOT NULL DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN locked_at timestamp with time zone;
ALTER TABLE public.profiles ADD COLUMN locked_reason text;

-- Update the handle_new_user function to assign default 'user' role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Function to check if account is locked
CREATE OR REPLACE FUNCTION public.is_account_locked(user_email text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  locked boolean;
BEGIN
  SELECT p.account_locked INTO locked
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  WHERE u.email = user_email;
  
  RETURN COALESCE(locked, false);
END;
$$;

-- Function to get failed login attempts in last 15 minutes
CREATE OR REPLACE FUNCTION public.get_recent_failed_attempts(user_email text)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  attempt_count integer;
BEGIN
  SELECT COUNT(*) INTO attempt_count
  FROM public.login_attempts
  WHERE login_attempts.user_email = get_recent_failed_attempts.user_email
    AND success = false
    AND attempted_at > (now() - interval '15 minutes');
  
  RETURN COALESCE(attempt_count, 0);
END;
$$;

-- Function to lock account after failed attempts
CREATE OR REPLACE FUNCTION public.lock_account_after_failed_attempts(user_email text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.profiles
  SET 
    account_locked = true,
    locked_at = now(),
    locked_reason = 'Too many failed login attempts'
  FROM auth.users
  WHERE auth.users.id = profiles.id
    AND auth.users.email = user_email;
END;
$$;

-- Add 'magazinier' and 'financë' roles to the app_role enum
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'magazinier';
ALTER TYPE app_role ADD VALUE IF NOT EXISTS 'finance';