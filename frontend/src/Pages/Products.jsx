import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../Context/Context'

const Products = () => {
    const { data , searchTerm , filteredData , setSearchTerm} = useContext(AppContext)
  

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>

            {/* Search Box */}
            <div className="flex justify-center mb-10">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-1/2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                {filteredData.length > 0 ? (
                    filteredData.map((item, key) => (
                        <div
                            key={key}
                            className="bg-white rounded-lg border overflow-hidden shadow-sm transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                        >
                            <div className="bg-white p-4 flex justify-center items-center">
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="h-40 object-contain transition-transform duration-300 hover:scale-110"
                                />
                            </div>
                            <div className="px-4 pb-4">
                                <h2 className="text-md font-semibold text-gray-800 truncate">{item.title}</h2>
                                <p className="text-sm text-gray-500 mb-1">Brand: {item.brand}</p>

                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lg text-red-600">${item.price}</span>
                                    <span className="text-xs text-green-600">-{item.discountPercentage}%</span>
                                </div>

                                <div className="flex items-center mb-2">
                                    <span className="text-yellow-400 text-lg mr-1">⭐</span>
                                    <span className="text-sm">{item.rating}</span>
                                </div>

                                <p className={`text-sm font-semibold ${item.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-500"}`}>
                                    {item.availabilityStatus}
                                </p>

                                <Link to={`/CartDetails/${item.id}`}>
                                    <button className="mt-3 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded transition duration-300">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-2xl font-bold text-red-500">😔 No products found!</p>
                        <p className="text-gray-500 mt-2">Try searching with another keyword.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Products
