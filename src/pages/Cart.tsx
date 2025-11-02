import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Shporta juaj është bosh</h2>
            <p className="text-muted-foreground">Shtoni produkte për të vazhduar me blerjen</p>
            <Link to="/products">
              <Button size="lg">Shfleto produktet</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shporta e blerjeve</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 bg-card rounded-lg border shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                
                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`}>
                    <h3 className="font-semibold hover:text-primary transition-colors truncate">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                  <p className="text-lg font-bold text-primary mt-2">
                    €{item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-between">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-lg border shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-4">Përmbledhje e porosisë</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nëntotali</span>
                  <span className="font-semibold">€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dërgesa</span>
                  <span className="font-semibold">
                    {getTotalPrice() > 100 ? 'Falas' : '€5.00'}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Totali</span>
                  <span className="text-primary">
                    €{(getTotalPrice() + (getTotalPrice() > 100 ? 0 : 5)).toFixed(2)}
                  </span>
                </div>
              </div>

              {getTotalPrice() < 100 && (
                <p className="text-sm text-muted-foreground mb-4">
                  Shto €{(100 - getTotalPrice()).toFixed(2)} për dërgim falas!
                </p>
              )}

              <Link to="/checkout">
                <Button size="lg" className="w-full" variant="accent">
                  Vazhdo me pagesën
                </Button>
              </Link>

              <Link to="/products">
                <Button variant="ghost" className="w-full mt-2">
                  Vazhdo blerjen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
