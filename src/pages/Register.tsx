import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            first_name: firstName,
            last_name: lastName
          }
        }
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        await supabase
          .from('verification_codes')
          .insert({
            user_id: authData.user.id,
            code: verificationCode,
            purpose: 'email_verification'
          });

        // Send verification email
        await supabase.functions.invoke('send-verification-email', {
          body: { 
            email, 
            code: verificationCode,
            firstName 
          }
        });

        toast.success('Llogaria u krijua! Kontrolloni emailin për verifikim.');
        navigate('/verify-email', { state: { email } });
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Gabim gjatë regjistrimit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Krijoni një llogari</h1>
            <p className="text-muted-foreground">Filloni të blini sot</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border shadow-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Emri</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Emri"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Mbiemri</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Mbiemri"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Fjalëkalimi</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Konfirmoni fjalëkalimin</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded"
                required
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                Pranoj{' '}
                <a href="#" className="text-primary hover:underline">
                  Kushtet e Shërbimit
                </a>{' '}
                dhe{' '}
                <a href="#" className="text-primary hover:underline">
                  Politikën e Privatësisë
                </a>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Duke u krijuar...' : 'Krijo llogari'}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Keni tashmë llogari? </span>
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Hyni
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
