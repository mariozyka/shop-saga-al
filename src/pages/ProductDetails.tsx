import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft, Package, Shield, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find((p) => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Produkti nuk u gjet</h2>
            <Link to="/products">
              <Button>Kthehu te produktet</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/products">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kthehu te produktet
          </Button>
        </Link>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Image */}
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">€{product.price.toFixed(2)}</span>
              <span className="text-muted-foreground">
                {product.stock > 0 ? `${product.stock} në stok` : 'Pa stok'}
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <label className="font-semibold">Sasia:</label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  +
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              size="lg"
              className="w-full"
              variant="accent"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.stock === 0 ? 'Pa stok' : 'Shto në shportë'}
            </Button>

            {/* Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-semibold">Paketim i sigurt</div>
                  <div className="text-sm text-muted-foreground">
                    Të gjitha produktet paketohen me kujdes
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Truck className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-semibold">Dërgim falas</div>
                  <div className="text-sm text-muted-foreground">
                    Për porosi mbi €100
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-semibold">Garanci 2 vjeçare</div>
                  <div className="text-sm text-muted-foreground">
                    Për të gjitha produktet elektronike
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Produkte të ngjashme</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
