import React from "react";



function Header() {
    return (
        <div className="relative h-[500px] bg-gray-500 flex flex-col md:flex-row">
        <img className="w-full md:w-1/2 object-cover" src="/mainImage-2.jpg" alt="Furniture" />
        <img className="w-full md:w-1/2 object-cover" src="/mainImage-3.jpg" alt="Furniture" />

        <h1 className="absolute inset-0 flex items-center justify-center text-white text-2xl md:text-4xl font-bold bg-opacity-50 text-center p-4">
          <span className="text-black mr-2">Transform</span> Your Space, Elevate Your Style – Discover Furniture Designed for You!
        </h1>
      </div>
    )
}


export default Header