import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, Leaf, X } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
import AuthModal from './AuthModal';

export default function Navbar() {
  const cartItems = useCartStore((state) => state.items);
  useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-brand-600">
              <Leaf className="w-6 h-6 md:w-8 md:h-8" />
              <span>NAVISHKA</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/shop" className="text-gray-70000 hover:text-brand-600 font-bold">
                Shop
              </Link>
            </div>


            <div className="flex items-center space-x-4 md:space-x-6">

              <Link to="/cart" className="text-gray-700 hover:text-brand-600 relative">
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-700"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="container mx-auto px-4 py-4 space-y-3">
              <Link
                to="/shop"
                className="block text-gray-700 hover:text-brand-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/shop?category=shampoo"
                className="block text-gray-700 hover:text-brand-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shampoo
              </Link>
              <Link
                to="/shop?category=treatments"
                className="block text-gray-700 hover:text-brand-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Treatments
              </Link>
              <Link
                to="/shop?category=accessories"
                className="block text-gray-700 hover:text-brand-600 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accessories
              </Link>
            </div>
          </div>
        )}
      </nav>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}