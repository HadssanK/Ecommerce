import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const backendUrl = "http://localhost:4000";

  // 🔒 Check Auth State
  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, { withCredentials: true });
      if (data.success) {
        setIsLoggedin(true);
        await getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(null);
      }
    } catch (err) {
      setIsLoggedin(false);
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/Data`, { withCredentials: true });
      if (data.success) {
        setUserData(data.userData);
      } else {
        setUserData(null);
        toast.error(data.message);
      }
    } catch (err) {
      setUserData(null);
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // On mount
  useEffect(() => {
    getAuthState();
  }, []);

  // Load cartItems from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Save cartItems to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch all products
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products", {
          withCredentials: false,
        });
        setData(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchAllData();
  }, []);

  // Filter by search term
  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  // Fetch Single Product + Related
  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);

      const allProductsResponse = await axios.get("https://dummyjson.com/products");
      const related = allProductsResponse.data.products.filter(item =>
        item.category === response.data.category && item.id !== response.data.id
      );
      setRelatedProducts(related);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  // Add to Cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const isAlreadyInCart = prev.find(item => item.id === product.id);
      if (isAlreadyInCart) return prev;
      return [...prev, product];
    });
  };

  // Remove from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Update quantity in cart
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // ✅ Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // Final Context value
  const value = {
    data,
    product,
    relatedProducts,
    fetchProductDetails,
    filteredData,
    searchTerm,
    setSearchTerm,
    addToCart,
    cartItems,
    removeFromCart,
    isLoggedin,
    setIsLoggedin,
    getUserData,
    userData,
    setUserData,
    isLoading,
    backendUrl,
    updateQuantity,
    clearCart, // ✅ provided to all components
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
