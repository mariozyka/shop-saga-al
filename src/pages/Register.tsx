import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Register = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Llogaria u krijua me sukses!');
    setLoading(false);
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
                  placeholder="Emri"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Mbiemri</Label>
                <Input
                  id="lastName"
                  placeholder="Mbiemri"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Fjalëkalimi</Label>
              <Input
                id="password"
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
