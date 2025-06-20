// Routes/StripeRoute.js
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const Striperouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const frontendUrl =
  process.env.NODE_ENV === "production"
    ? "https://ecommerce-frontend-uknj.onrender.com"
    : "http://localhost:5173";

Striperouter.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;

  try {
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "No items in cart" });
    }

    const line_items = cartItems.map(item => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.thumbnail],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cancel`, // 👈 Optional
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ message: "Stripe session creation failed" });
  }
});

export default Striperouter;
