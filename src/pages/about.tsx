import React from "react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="mt-4 text-gray-600">
            Learn more about our mission, values, and the story behind our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800">Our Mission</h2>
            <p className="mt-4 text-gray-600">
              Our mission is to provide an intuitive platform where users can easily explore and interact with high-quality products.
            </p>
          </div>

          {/* Values */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800">Our Values</h2>
            <p className="mt-4 text-gray-600">
              We value transparency, innovation, and customer satisfaction. These principles guide every decision we make.
            </p>
          </div>

          {/* Story */}
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-800">Our Story</h2>
            <p className="mt-4 text-gray-600">
              Started in 2025, our platform was built to connect users with the products and services they need, anytime, anywhere.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Thank you for choosing us. We’re dedicated to making your experience exceptional!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
