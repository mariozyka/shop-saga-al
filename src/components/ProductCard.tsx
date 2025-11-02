import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Product, useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <Link to={`/products/${product.id}`}>
        <div className="relative overflow-hidden aspect-square bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
          {product.stock < 10 && (
            <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded">
              Stok i kufizuar
            </div>
          )}
        </div>
      </Link>
      
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground mb-1">{product.category}</div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">€{product.price.toFixed(2)}</span>
          <span className="text-sm text-muted-foreground">Stok: {product.stock}</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
          className="w-full"
          variant="accent"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.stock === 0 ? 'Pa stok' : 'Shto në shportë'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
