const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800">Who We Are</h1>
          <p className="mt-4 text-lg text-gray-600">
            Welcome to Navishka! We are passionate about providing you with natural, eco-friendly hair care products.
          </p>
        </div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <img
              src="data:image/jpeg;base64,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"
              alt="Mission"
              className="rounded-lg mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To empower individuals with high-quality, natural hair care solutions that nourish and protect, while promoting a healthier planet.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9v9FBKbq0U15hJzE8ZngHAQFYgj1KXxU61w&s"

              alt="Values"
              className="rounded-lg mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600">
              Transparency, sustainability, and customer satisfaction drive everything we do. Our commitment is to your well-being and the environment.
            </p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp2yxzmW2rwQb8SceUJHcGs8DChm-FkwvrzQ&s"

              alt="Story"
              className="rounded-lg mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600">
              Since our founding, we have been dedicated to creating organic hair care products using the finest natural ingredients.
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-16">
          <div className="flex justify-center">
            <img
              src="https://github.com/Oscarleo11/navishka-Produits/blob/main/Navi2.jpg?raw=true"
              alt="Navishka Products"
              className="rounded-lg shadow-md"
            />
          </div>
          <p className="mt-6 text-center text-gray-600">
            Discover our range of shampoos, creams, soaps, and butters crafted for your natural beauty.
          </p>
        </div>

        {/* Closing Statement */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h3>
          <p className="text-gray-600">
            Thank you for trusting Navishka. Your journey to natural, eco-friendly hair care starts here. Together, let’s celebrate your beauty!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;