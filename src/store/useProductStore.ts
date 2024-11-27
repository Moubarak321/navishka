import { create } from 'zustand';
import { products as initialProducts } from '../data/products';
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

interface ProductState {
  products: Product[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviews'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
  uploadImage: (file: File) => Promise<string>;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: initialProducts,
  categories: ['skincare', 'makeup', 'fragrance', 'tools'],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    try {
      set({ isLoading: true, error: null });
      // Using local data since we're in development
      set({ products: initialProducts });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ products: initialProducts, error: 'Failed to fetch products' });
      toast.error('Using local data');
    } finally {
      set({ isLoading: false });
    }
  },

  uploadImage: async (file: File) => {
    try {
      // For development, we'll use a URL.createObjectURL
      const objectUrl = URL.createObjectURL(file);
      return objectUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      // Fallback to Unsplash
      return `https://source.unsplash.com/random/400x400/?cosmetics&${Date.now()}`;
    }
  },

  addProduct: async (productData) => {
    try {
      set({ isLoading: true, error: null });
      
      const newProduct = {
        ...productData,
        id: crypto.randomUUID(),
        rating: 0,
        reviews: 0
      };
      
      set((state) => ({
        products: [newProduct, ...state.products]
      }));
      
      toast.success('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    } finally {
      set({ isLoading: false });
    }
  },

  updateProduct: async (id, updatedData) => {
    try {
      set({ isLoading: true, error: null });
      
      set((state) => ({
        products: state.products.map((product) =>
          product.id === id ? { ...product, ...updatedData } : product
        )
      }));
      
      toast.success('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      set({ isLoading: false });
    }
  },

  deleteProduct: async (id) => {
    try {
      set({ isLoading: true, error: null });
      
      set((state) => ({
        products: state.products.filter((product) => product.id !== id)
      }));
      
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    } finally {
      set({ isLoading: false });
    }
  },

  getProductsByCategory: (category) => {
    return get().products.filter((product) => product.category === category);
  },
}));