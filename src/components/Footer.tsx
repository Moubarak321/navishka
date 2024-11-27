import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Leaf } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl md:text-2xl font-bold text-brand-600">
              <Leaf className="w-6 h-6 md:w-8 md:h-8" />
              <span>NAVISKA</span>
            </div>
            <p className="text-sm md:text-base text-gray-600">
              Discover natural hair care solutions with our organic collection.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-600">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brand-600">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/shop?category=shampoo" className="text-gray-600 hover:text-brand-600">
                  Shampoo
                </Link>
              </li>
              <li>
                <Link to="/shop?category=conditioner" className="text-gray-600 hover:text-brand-600">
                  Conditioner
                </Link>
              </li>
              <li>
                <Link to="/shop?category=treatments" className="text-gray-600 hover:text-brand-600">
                  Treatments
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="text-gray-600 hover:text-brand-600">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-600">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-brand-600">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-brand-600">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-600">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Subscribe for natural hair care tips and special offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm md:text-base rounded-lg border focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="w-full bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition text-sm md:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t text-center text-sm md:text-base text-gray-600">
          <p>&copy; {new Date().getFullYear()} Naviska Natural Hair Care. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;