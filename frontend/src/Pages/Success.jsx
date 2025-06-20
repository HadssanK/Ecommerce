// src/pages/Success.jsx
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { AppContext } from '../Context/Context';

const Success = () => {
    const { clearCart } = useContext(AppContext);

useEffect(() => {
  clearCart();
}, []);
  return (
    <div className="min-h-screen bg-green-50 flex flex-col justify-center items-center text-center px-4">
      <FaCheckCircle className="text-green-600 text-6xl mb-4" />
      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">
        Payment Successful!
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase. A confirmation email has been sent to you.
      </p>

      <Link
        to="/products"
        className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
      >
        🛒 Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
