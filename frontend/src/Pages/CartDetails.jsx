import React, { useContext, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/Context';

const CartDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    product,
    relatedProducts,
    fetchProductDetails,
    addToCart,
    userData
  } = useContext(AppContext);

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  if (!product) {
    return <div className="text-center py-20 text-xl font-semibold">Loading...</div>;
  }

  const handleAddToCart = () => {
    if (!userData) {
      alert("Please login to add items to your cart!");
      navigate("/login");
      return;
    }

    addToCart(product);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row">
        <div className="md:w-1/2 flex justify-center items-center border-r p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-[400px] object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="md:w-1/2 p-4 md:pl-10">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-lg text-gray-700 mb-4">{product.description}</p>

          <div className="flex items-center mb-3">
            <span className="text-2xl text-red-600 font-bold mr-2">${product.price}</span>
            <span className="text-green-600 font-semibold">Save {product.discountPercentage}%</span>
          </div>

          <div className="flex items-center mb-3">
            <span className="text-yellow-400 text-xl mr-1">⭐</span>
            <span className="text-md">{product.rating} Ratings</span>
          </div>

          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Brand:</span> {product.brand}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <button
            onClick={handleAddToCart}
            className="mt-5 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            Add to Cart
          </button>

          <div className="mt-5">
            <Link to="/" className="text-blue-500 hover:underline">⬅ Back to Products</Link>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-6xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {relatedProducts.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-40 object-contain mx-auto mb-4"
              />
              <h3 className="text-md font-semibold mb-2">{item.title}</h3>
              <p className="text-red-600 font-bold mb-2">${item.price}</p>
              <Link to={`/CartDetails/${item.id}`}>
                <button className="bg-yellow-400 hover:bg-yellow-300 w-full py-2 rounded font-semibold">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
