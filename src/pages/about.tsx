import React from "react";

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
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              To empower individuals with high-quality, natural hair care solutions that nourish and protect, while promoting a healthier planet.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            <p className="text-gray-600">
              Transparency, sustainability, and customer satisfaction drive everything we do. Our commitment is to your well-being and the environment.
            </p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow">
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
              src="https://via.placeholder.com/600x400"
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
