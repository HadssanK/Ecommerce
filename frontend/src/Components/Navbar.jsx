import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShopLogo from '../assets/shop-logo.png';
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import { AppContext } from '../Context/Context';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const { cartItems, userData, setUserData, setIsLoggedin, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`, {}, { withCredentials: true });
      if (data.success) {
        setUserData(null);
        setIsLoggedin(false);
        localStorage.removeItem("token");
        toast.success("Logout successful");
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const handleVerify = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/send-verify-Otp`, {}, { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        navigate("/email-verify");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Verification failed");
    }
  };

  return (
    <nav className="bg-gradient-to-r from-amber-500 to-pink-500 text-white shadow-md sticky top-0 z-50">
      {/* ✅ Desktop Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-5 hidden md:flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src={ShopLogo} alt="Logo" className="w-32 h-24 object-contain absolute rounded-full" />
        </div>

        {/* Center: Nav Links */}
        <div className="flex space-x-8 text-lg font-medium mx-auto">
          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/products" className="hover:text-yellow-300 transition">Shop</Link>
          <Link to="/about" className="hover:text-yellow-300 transition">About Us</Link>
          <Link to="/contactform" className="hover:text-yellow-300 transition">Contact</Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-5 text-white">
          <Link to="/products" className="hover:text-yellow-300 transition">
            <FaSearch size={20} />
          </Link>

          {userData ? (
            <div className="relative group">
              <div className="w-9 h-9 bg-black rounded-full flex items-center justify-center cursor-pointer">
                {userData.Name?.charAt(0)?.toUpperCase()}
              </div>
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-black shadow-md rounded w-40 text-sm z-50">
                <ul className="py-2">
                  {!userData.isAccountVerified && (
                    <li onClick={handleVerify} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Verify Email</li>
                  )}
                  <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="hover:text-yellow-300 transition">
              <FaUser size={18} />
            </Link>
          )}

          <Link to="/cart" className="relative hover:text-yellow-300 transition">
            <FaShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ✅ Mobile Navbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        {/* Left Side */}
        {userData ? (
          <div className="relative">
            <div
              className="w-9 h-9 bg-black rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => setShowMobileDropdown(!showMobileDropdown)}
            >
              {userData.Name?.charAt(0)?.toUpperCase()}
            </div>

            {/* Mobile Dropdown */}
            {showMobileDropdown && (
              <div className="absolute left-0 mt-2 bg-white text-black shadow-md rounded w-40 text-sm z-50">
                <ul className="py-2">
                  {!userData.isAccountVerified && (
                    <li onClick={() => { handleVerify(); setShowMobileDropdown(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Verify Email</li>
                  )}
                  <li onClick={() => { handleLogout(); setShowMobileDropdown(false); }} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <img src={ShopLogo} alt="Logo" className="h-10 w-auto object-contain" />
        )}

        {/* Center: Removed extra logo */}

        {/* Right Side */}
        <div className="flex items-center gap-3 text-white">
          {!userData && (
            <Link to="/login" className="hover:text-yellow-300 transition">
              <FaUser size={18} />
            </Link>
          )}
          <Link to="/cart" className="relative hover:text-yellow-300 transition">
            <FaShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Mobile Dropdown Menu */}
      {isOpen && (
        <ul className="md:hidden bg-gradient-to-r from-amber-500 to-pink-500 px-4 pb-4 space-y-2 text-base">
          <li><Link to="/" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white hover:text-yellow-300">Home</Link></li>
          <li><Link to="/products" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white hover:text-yellow-300">Shop</Link></li>
          <li><Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white hover:text-yellow-300">About Us</Link></li>
          <li><Link to="/contactform" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white hover:text-yellow-300">Contact</Link></li>
          {!userData && (
            <li><Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white hover:text-yellow-300">Login</Link></li>
          )}
          <li><Link to="/cart" onClick={() => setIsOpen(false)} className="block py-2 border-b border-white hover:text-yellow-300">Cart ({cartItems.length})</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
