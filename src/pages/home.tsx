import { Link } from 'react-router-dom';
import { Star, TrendingUp, Award, ShieldCheck } from 'lucide-react';

function Home() {
  return (
    <div className="space-y-8 md:space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[600px] rounded-lg md:rounded-2xl overflow-hidden">
        <img
          src="https://github.com/Oscarleo11/navishka-Produits/blob/main/navis.jpg?raw=true"
          alt="Natural Hair Care"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent">
          <div className="container mx-auto h-full flex items-center">
            <div className="max-w-xl text-white p-4 md:p-8 space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold">Navishka cosmetics</h1>
              <p className="text-base md:text-lg">
              Votre beauté rayonne au naturel.
              </p>
              <Link
                to="/shop"
                className="inline-block btn bg-green-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold hover:bg-opacity-90 transition"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {[
          { icon: Star, title: 'Natural Quality', desc: 'Pure organic ingredients' },
          { icon: TrendingUp, title: 'Eco-Friendly', desc: 'Sustainable solutions' },
          { icon: Award, title: 'Certified Organic', desc: 'Natural ingredients' },
          { icon: ShieldCheck, title: 'Safe Shopping', desc: 'Secure transactions' },
        ].map((feature) => (
          <div key={feature.title} className="bg-white p-4 md:p-6 rounded-xl shadow-sm">
            <feature.icon className="w-8 h-8 md:w-10 md:h-10 text-brand-600 mb-4" />
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Product cards will be dynamically rendered here */}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-4 bg-gradient-to-r from-brand-600 to-brand-700 rounded-xl md:rounded-2xl p-6 md:p-12 text-white">
        <div className="max-w-2xl mx-auto text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">Stay Natural, Stay Updated</h2>
          <p className="text-sm md:text-base">Subscribe to our newsletter for natural hair care tips and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full text-black text-sm md:text-base"
            />
            <button
              type="submit"
              className="bg-black px-6 py-2 rounded-full hover:bg-opacity-80 transition text-sm md:text-base whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
