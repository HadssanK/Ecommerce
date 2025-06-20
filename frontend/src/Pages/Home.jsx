import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import beauty from '../assets/beauty.png'
import fruit from '../assets/fruit.png'
import vege from '../assets/vege.png'
import { AppContext } from '../Context/Context'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Home = () => {
  const { data } = useContext(AppContext)

  // Category state
  const [category, setCategory] = useState('All')

  // Sorting state
  const [sortOrder, setSortOrder] = useState('none')

  // Filter and sort products based on category and sortOrder
  const filteredProducts = data.filter(item => {
    if (category === 'All') return true
    if (category === 'Makeup') return item.category.toLowerCase() === 'beauty'
    if (category === 'fragrances') return item.category.toLowerCase() === 'fragrances'
    if (category === 'groceries') return item.category.toLowerCase() === 'groceries'
    if (category === 'furniture') return item.category.toLowerCase() === 'furniture' || item.category.toLowerCase() === 'furniture'
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'lowToHigh') return a.price - b.price
    if (sortOrder === 'highToLow') return b.price - a.price
    return 0
  })

  // Limit to 8 featured products
  const limitedProducts = sortedProducts.slice(0, 8)

  const slides = [
    {
      title: "Glam Up with Premium Makeup",
      desc: "Discover our exclusive makeup collection for a flawless look.",
      btn1: "💄 Shop Makeup",
      btn2: "🌟 View Offers",
      bg: "bg-gradient-to-r from-pink-500 to-rose-400",
      img: beauty
    },
    {
      title: "Fresh Fruits for a Healthy You",
      desc: "Handpicked fruits delivered straight from farms to your doorstep.",
      btn1: "🍎 Shop Fruits",
      btn2: "🎁 Fruit Offers",
      bg: "bg-gradient-to-r from-green-400 to-lime-500",
      img: fruit
    },
    {
      title: "Green Goodness in Every Bite",
      desc: "Fresh vegetables full of nutrients for a balanced diet.",
      btn1: "🥦 Shop Veggies",
      btn2: "💚 Healthy Deals",
      bg: "bg-gradient-to-r from-emerald-500 to-green-600",
      img: vege
    }
  ];

  return (
    <>
      <section className="w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          centeredSlides={false}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="w-full h-[450px]"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className={`${slide.bg} text-white h-full flex items-center justify-between px-6 md:px-20`}>
                <div className="max-w-xl space-y-4">
                  <h1 className="text-3xl md:text-5xl font-bold">{slide.title}</h1>
                  <p className="text-lg md:text-xl">{slide.desc}</p>
                  <div className="space-x-4">
                    <Link
                      to="/Products"
                      className="bg-yellow-400 text-blue-900 px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition"
                    >
                      {slide.btn1}
                    </Link>
                    <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-blue-700 transition">
                      {slide.btn2}
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center w-[450px] h-[370px]">
                  <img
                    src={slide.img}
                    alt={slide.title}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Filters and Sort */}
      <section className="max-w-6xl mx-auto py-6 px-5 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="space-x-3">
          <button
            onClick={() => setCategory('All')}
            className={`px-4 py-2 rounded-full font-semibold ${category === 'All' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            All
          </button>
          <button
            onClick={() => setCategory('Makeup')}
            className={`px-4 py-2 rounded-full font-semibold ${category === 'Makeup' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Makeup
          </button>
          <button
            onClick={() => setCategory('fragrances')}
            className={`px-4 py-2 rounded-full font-semibold ${category === 'fragrances' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            fragrances
          </button>
          <button
            onClick={() => setCategory('furniture')}
            className={`px-4 py-2 rounded-full font-semibold ${category === 'furniture' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            furniture
          </button>
           <button
            onClick={() => setCategory('groceries')}
            className={`px-4 py-2 rounded-full font-semibold ${category === 'groceries' ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            groceries
          </button>
        </div>

        <div>
          <select
            value={sortOrder}
            onChange={e => setSortOrder(e.target.value)}
            className="border border-gray-300 rounded-lg p-2"
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
  )
}

export default Home
