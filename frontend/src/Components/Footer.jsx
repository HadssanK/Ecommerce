import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-500 to-pink-500 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        
        {/* Section 1: Logo + About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">MyShop</h2>
          <p className="text-sm">
            A trusted eCommerce store for all your needs. Fast delivery & quality products.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/cart" className="hover:text-yellow-400">Cart</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        {/* Section 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <p>Email: support@myshop.com</p>
          <p>Phone: +92 300 1234567</p>
          <p>Location: Lahore, Pakistan</p>
        </div>
      </div>

      <div className="text-center bg-blue-900 py-3 text-sm">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
