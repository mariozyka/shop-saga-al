import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const VerifyEmail = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: verification, error: verifyError } = await supabase
        .from('verification_codes')
        .select('*')
        .eq('code', code)
        .eq('used', false)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (verifyError || !verification) {
        toast.error('Kod i pavlefshëm ose i skaduar');
        setLoading(false);
        return;
      }

      // Mark code as used
      await supabase
        .from('verification_codes')
        .update({ used: true })
        .eq('id', verification.id);

      toast.success('Emaili u verifikua me sukses!');
      navigate('/login');
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Gabim gjatë verifikimit');
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error('Email nuk u gjet');
      return;
    }

    setLoading(true);
    try {
      // Generate new code
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      const { data: userData } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (userData) {
        await supabase
          .from('verification_codes')
          .insert({
            user_id: userData.id,
            code: newCode,
            purpose: 'email_verification'
          });

        await supabase.functions.invoke('send-verification-email', {
          body: { email, code: newCode }
        });

        toast.success('Kodi i ri u dërgua në email');
      }
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Gabim gjatë dërgimit të kodit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verifiko Email</CardTitle>
            <CardDescription>
              Shkruani kodin 6-shifror që u dërgua në {email || 'emailin tuaj'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Kodi i Verifikimit</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="123456"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Duke verifikuar...' : 'Verifiko'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendCode}
                disabled={loading}
              >
                Dërgo kodin përsëri
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default VerifyEmail;
