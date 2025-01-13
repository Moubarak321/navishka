import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, MessageCircle } from 'lucide-react'; // Ajout de MessageCircle pour l'icône WhatsApp

function Footer() {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Section Logo et Description */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex justify-center sm:justify-start items-center gap-2 text-xl md:text-2xl font-bold text-brand-600">
              <img
                src="https://github.com/Oscarleo11/navishka-Produits/blob/main/logo.jpg?raw=true"
                alt="Logo de l'entreprise"
                className="w-auto h-16 md:h-40 lg:h-40 object-contain"
              />
            </div>
            <p className="text-sm md:text-base text-gray-600">
              Discover natural hair care solutions with our organic collection.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://web.facebook.com/profile.php?id=100064085431329" className="text-gray-400 hover:text-brand-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/justinegbodossou?igsh=MW5ibzM5bWx3bWI1eQ==" className="text-gray-400 hover:text-brand-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/GbodossouJ23738" className="text-gray-400 hover:text-brand-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/justine-gbodossou-232a32131?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-brand-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://wa.me/22962003202" className="text-gray-400 hover:text-brand-600 transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Section Shop */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/shop?category=shampoo" className="text-gray-600 hover:text-brand-600 transition-colors">
                  Shampoo
                </Link>
              </li>
              <li>
                <Link to="/shop?category=conditioner" className="text-gray-600 hover:text-brand-600 transition-colors">
                  Conditioner
                </Link>
              </li>
              <li>
                <Link to="/shop?category=treatments" className="text-gray-600 hover:text-brand-600 transition-colors">
                  Treatments
                </Link>
              </li>
              <li>
                <Link to="/shop?category=accessories" className="text-gray-600 hover:text-brand-600 transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Help */}
          <div className="text-center sm:text-left">
            <h4 className="font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-brand-600 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-600 hover:text-brand-600 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Section Newsletter */}
          <div className="text-center sm:text-left">
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

        {/* Section Copyright */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t text-center text-sm md:text-base text-gray-600">
          <p>&copy; {new Date().getFullYear()} Naviska Natural Hair Care. All rights reserved.</p>
        </div>

        {/* Bouton de retour en haut */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 bg-brand-600 text-white p-3 rounded-full shadow-lg hover:bg-brand-700 transition-colors"
        >
          ↑
        </button>
      </div>
    </footer>
  );
}

export default Footer;