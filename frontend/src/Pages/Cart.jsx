import React, { useContext } from 'react';
import { AppContext } from '../Context/Context';
import { MdClose } from 'react-icons/md';
import { loadStripe } from '@stripe/stripe-js'; // ✅ Stripe

// 🔑 Replace with your actual Stripe publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(AppContext);

  // Subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);

  // Fixed Shipping Fee
  const shippingFee = cartItems.length > 0 ? 10 : 0;

  // Total = Subtotal + Shipping
  const totalAmount = subtotal + shippingFee;

  // ✅ Handle Stripe Checkout
 const handleCheckout = async () => {
  try {
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to initialize");
      alert("Stripe not loaded properly.");
      return;
    }

    const response = await fetch("http://localhost:4000/api/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems }),
    });

    const data = await response.json();

    if (data?.id) {
      stripe.redirectToCheckout({ sessionId: data.id });
    } else {
      console.error("Stripe session creation failed:", data);
      alert("Stripe session creation failed.");
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Error during checkout. Check console.");
  }
};


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-8">
      {/* Cart Items Section */}
      <div className="flex-1 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center">Your cart is empty 🛒</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => {
              const quantity = item.quantity || 1;

              return (
                <div
                  key={item.id}
                  className="flex items-center gap-4 border-b pb-4 relative"
                >
                  {/* ❌ Remove Icon */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-0 right-0 p-1 text-red-500 hover:text-red-700"
                    title="Remove item"
                  >
                    <MdClose size={20} />
                  </button>

                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-contain rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-gray-500 text-sm">Brand: {item.brand}</p>
                    <p className="text-red-600 font-semibold">
                      ${item.price} x {quantity} = ${(item.price * quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Invoice Summary */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow h-fit">
        <h2 className="text-2xl font-bold mb-6">Invoice Summary</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shippingFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 rounded transition duration-300"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
