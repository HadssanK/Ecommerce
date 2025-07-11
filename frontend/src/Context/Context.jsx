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

  const backendUrl = import.meta.env.MODE === "development"
    ? "http://localhost:4000"
    : "https://ecommerce-backend-hljs.onrender.com";

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

  useEffect(() => {
    getAuthState();
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchAllData();
  }, []);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

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

  const addToCart = (product) => {
    setCartItems((prev) => {
      const isAlreadyInCart = prev.find(item => item.id === product.id);
      if (isAlreadyInCart) return prev;
      return [...prev, product];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };
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
    clearCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
