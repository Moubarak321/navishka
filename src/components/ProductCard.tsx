import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    const { id, name, price, image } = product;
    addItem({ id, name, price, image });
    toast.success('Added to cart');
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
          loading="lazy"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-white p-2 rounded-full shadow-md hover:bg-brand-600 hover:text-white transition"
        >
          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="text-sm md:text-base font-semibold mb-1 group-hover:text-brand-600 transition line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 md:w-4 md:h-4 ${
                i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="text-xs md:text-sm text-gray-500">({product.reviews})</span>
        </div>
        <p className="font-semibold text-brand-600 text-sm md:text-base">
          {product.price} fcfa
        </p>
      </div>
    </Link>
  );
}

export default ProductCard;