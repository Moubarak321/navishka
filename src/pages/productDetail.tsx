import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, Heart, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { getProductById } from '../lib/firebase'; // Importez la fonction getProductById

import toast from 'react-hot-toast';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const productData = await getProductById(id); // Utilisez la fonction getProductById
      if (productData) {
        setProduct(productData as Product);
      } else {
        toast.error('Product not found');
        navigate('/shop');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
      navigate('/shop');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    const { id, name, price, image } = product;
    addItem({ id, name, price, image });
    toast.success('Added to cart');
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-brand-600 mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Shop
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl sm:text-2xl font-semibold text-brand-600">
              {product.price} fcfa
            </p>
          </div>

          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  i < product.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm sm:text-base text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button className="btn btn-secondary">
                <Heart className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full btn btn-primary py-3 bg-green-600 text-white "
            >
              Add to Cart
            </button>
          </div>

          {/* Additional Product Details */}
          <div className="pt-6 border-t">
            <h3 className="font-semibold mb-4">Product Details</h3>
            <dl className="space-y-4">
              <div className="flex">
                <dt className="w-24 text-gray-600">Category:</dt>
                <dd className="flex-1 capitalize">{product.category}</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-600">Type:</dt>
                <dd className="flex-1">Natural Hair Care</dd>
              </div>
              <div className="flex">
                <dt className="w-24 text-gray-600">Origin:</dt>
                <dd className="flex-1">Organic Sources</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;