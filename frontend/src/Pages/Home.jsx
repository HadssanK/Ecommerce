import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import beauty from '../assets/beauty.png';
import fruit from '../assets/fruit.png';
import vege from '../assets/vege.png';
import { AppContext } from '../Context/Context';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const { data } = useContext(AppContext);

  const [category, setCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('none');

  const filteredProducts = data.filter(item => {
    if (category === 'All') return true;
    if (category === 'Makeup') return item.category.toLowerCase() === 'beauty';
    if (category === 'fragrances') return item.category.toLowerCase() === 'fragrances';
    if (category === 'groceries') return item.category.toLowerCase() === 'groceries';
    if (category === 'furniture') return item.category.toLowerCase() === 'furniture';
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price;
    if (sortOrder === 'highToLow') return b.price - a.price;
    return 0;
  });

  const limitedProducts = sortedProducts.slice(0, 8);

  const slides = [
    {
      title: "Glam Up with Premium Makeup",
      desc: "Discover our exclusive makeup collection for a flawless look.",
      btn1: "💄 Shop Makeup",
      
      bg: "bg-gradient-to-r from-pink-500 to-rose-400",
      img: beauty
    },
    {
      title: "Fresh Fruits for a Healthy You",
      desc: "Handpicked fruits delivered straight from farms to your doorstep.",
      btn1: "🍎 Shop Fruits",
     
      bg: "bg-gradient-to-r from-green-400 to-lime-500",
      img: fruit
    },
    {
      title: "Green Goodness in Every Bite",
      desc: "Fresh vegetables full of nutrients for a balanced diet.",
      btn1: "🥦 Shop Veggies",
      
      bg: "bg-gradient-to-r from-emerald-500 to-green-600",
      img: vege
    }
  ];

  return (
    <>
     <section className="w-full">
  <Swiper
    slidesPerView={1}
    loop={true}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    pagination={{ clickable: true }}
    navigation={false}
    modules={[Autoplay, Pagination, Navigation]}
    className="w-full h-[300px] md:h-[450px]"
  >
    {slides.map((slide, index) => (
      <SwiperSlide key={index}>
        <div className={`${slide.bg} text-white h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-20`}>
          <div className="max-w-xl text-center md:text-left space-y-4">
            <h1 className="text-2xl md:text-5xl font-bold">{slide.title}</h1>
            <p className="text-sm md:text-xl">{slide.desc}</p>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <Link to="/Products" className="bg-yellow-400 text-blue-900 px-12 py-2 rounded-full font-semibold hover:bg-yellow-300 transition">
                {slide.btn1}
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center w-[350px] h-[300px]">
            <img src={slide.img} alt={slide.title} className="w-full h-auto object-contain" />
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>


      {/* Filter and Sort */}
      <section className="max-w-6xl mx-auto py-6 px-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {['All', 'Makeup', 'fragrances', 'furniture', 'groceries'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold ${
                category === cat ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full md:w-auto text-center">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full md:w-auto"
          >
            <option value="none">Sort By Price</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-6xl mx-auto py-10 px-5">
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {limitedProducts.length > 0 ? (
            limitedProducts.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <img src={item.thumbnail} alt={item.title} className="h-40 object-contain mx-auto mb-4" />
                <h3 className="text-md font-semibold mb-2">{item.title}</h3>
                <p className="text-red-600 font-bold mb-2">${item.price}</p>
                <Link to={`/CartDetails/${item.id}`}>
                  <button className="bg-yellow-400 hover:bg-yellow-300 w-full py-2 rounded font-semibold">
                    View Details
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No products found for this category.</p>
          )}
        </div>

        <div className="text-center mt-10">
          <Link to='/Products' className="bg-blue-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-600 transition">
            View All Products
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
