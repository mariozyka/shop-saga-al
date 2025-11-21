-- Ensure all newly created functions have proper search_path set
-- This fixes the security linter warning about mutable search paths

-- Re-create is_account_locked with explicit search_path
CREATE OR REPLACE FUNCTION public.is_account_locked(user_email text)
RETURNS boolean
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
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

-- Re-create get_recent_failed_attempts with explicit search_path
CREATE OR REPLACE FUNCTION public.get_recent_failed_attempts(user_email text)
RETURNS integer
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
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

-- Re-create lock_account_after_failed_attempts with explicit search_path
CREATE OR REPLACE FUNCTION public.lock_account_after_failed_attempts(user_email text)
RETURNS void
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
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