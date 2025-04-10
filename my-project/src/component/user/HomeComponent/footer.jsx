import React from "react";

function Footer (){
    return (
        <div className="h-[200px] bg-gray-500 flex flex-col justify-center items-center text-white">
            <h2 className="text-lg font-semibold">POPULAR FURNITURES</h2>
            <p className="text-sm">© 2025 All Rights Reserved.</p>
            <div className="flex space-x-4 mt-2">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
                <a href="#" className="hover:underline">Contact Us</a>
            </div>
        </div>
    );    
}

export default Footer