import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          About Our Store
        </h1>

        {/* Intro Paragraph */}
        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-600">
          Welcome to our online store! We are committed to providing you with top-quality products ranging from fresh groceries to high-end cosmetics, all at unbeatable prices. Whether you're shopping for your daily needs or looking for premium beauty items, we've got you covered!
        </p>

        {/* 3 Columns: Mission, Vision, Why Us */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Mission */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-yellow-500">🎯 Our Mission</h3>
            <p className="text-gray-600">
              To deliver high-quality products quickly and affordably, making everyday shopping convenient for everyone, everywhere.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-green-500">🌱 Our Vision</h3>
            <p className="text-gray-600">
              To become the leading online marketplace for diverse products that combine quality, affordability, and sustainability.
            </p>
          </div>

          {/* Why Us */}
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2 text-blue-500">💡 Why Choose Us</h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Wide variety of products</li>
              <li>Fast and secure checkout</li>
              <li>Reliable customer support</li>
              <li>Easy returns and refunds</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Have questions or need help?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact our support team and we’ll be happy to assist you.
          </p>
          <a
            href="/contact"
            className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-3 rounded-full transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
