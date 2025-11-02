import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingBag, Truck, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Index = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent opacity-10" />
          <div className="container mx-auto px-4 py-20 md:py-32 relative">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Teknologjia më e re,{' '}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  në duart tuaja
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Zbuloni koleksionin tonë ekskluziv të produkteve teknologjike me cilësi të lartë dhe çmime konkurruese.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shfleto produktet
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Mëso më shumë
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Blerje e lehtë</h3>
                <p className="text-muted-foreground text-sm">
                  Proces i thjeshtë dhe i shpejtë për të gjitha produktet
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Dërgim i shpejtë</h3>
                <p className="text-muted-foreground text-sm">
                  Dërgojmë në të gjithë vendin brenda 2-3 ditëve
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Garanci e sigurt</h3>
                <p className="text-muted-foreground text-sm">
                  Të gjitha produktet vijnë me garanci 1-2 vjeçare
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Produktet në plan të parë</h2>
              <p className="text-muted-foreground text-lg">
                Zgjidhni nga produktet tona më të shituara
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/products">
                <Button size="lg" variant="outline">
                  Shiko të gjitha produktet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-accent text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Gati për të filluar blerjen?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Regjistrohuni sot dhe merrni 10% zbritje në blerjen tuaj të parë!
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="shadow-xl">
                Regjistrohu tani
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
