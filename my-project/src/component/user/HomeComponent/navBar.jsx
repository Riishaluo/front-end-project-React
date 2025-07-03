import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true); 
    const navigate = useNavigate();

    console.log(loggedIn)

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get("http://localhost:9999/check-auth", {
                    withCredentials: true,
                });
                setLoggedIn({
                    username: res.data.username,
                    isLogged: true,
                });
            } catch (err) {
                setLoggedIn(null);
            } finally {
                setLoading(false); 
            }
        };
        checkLoginStatus();
    }, []);

    if (loading) return null;

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:9999/logout", {}, { withCredentials: true });
            setLoggedIn(null);
            navigate("/login");
        } catch (err) {
            Swal.fire("Error", "Failed to logout", "error");
        }
    };

    return (
        <div>
            <nav className="flex flex-wrap items-center justify-between px-4 py-3 bg-gray-100 shadow-md relative">
                <h1 className="w-full text-center font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-0">
                    POPULAR FURNITURES
                </h1>

                <ul className="flex items-center space-x-4 ml-auto">
                    <li
                        onClick={() => {
                            if (loggedIn?.isLogged) {
                                navigate("/cart");
                            } else {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Please Login",
                                    text: "You must be logged in to access your cart.",
                                    confirmButtonColor: "#d33",
                                });
                            }
                        }}
                        className="list-none cursor-pointer"
                    >
                        <img
                            src="/cartIcon.png"
                            alt="Cart"
                            className="w-6 h-6 object-contain hover:scale-105 transition-transform"
                        />
                    </li>

                    {loggedIn?.isLogged ? (
                        <li className="relative list-none px-2 sm:px-4 cursor-pointer font-semibold">
                            <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                                {loggedIn.username || "User"}
                            </div>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-20">
                                    <ul className="py-2 text-sm text-gray-700">
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                navigate("/account");
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            Account
                                        </li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </li>
                    ) : (
                        <li
                            onClick={() => navigate("/login")}
                            className="list-none px-2 sm:px-4 cursor-pointer"
                        >
                            Login
                        </li>
                    )}
                </ul>
            </nav>

            <nav className="flex justify-center flex-wrap space-x-4 sm:space-x-6 p-4 bg-gray-200 shadow-sm text-sm sm:text-base">
                <ul className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
                    <li
                        className="list-none cursor-pointer hover:underline"
                        onClick={() => navigate("/category/sofa")}
                    >
                        Sofas
                    </li>
                    <li
                        className="list-none cursor-pointer hover:underline"
                        onClick={() => navigate("/category/bed")}
                    >
                        Beds
                    </li>
                    <li
                        className="list-none cursor-pointer hover:underline"
                        onClick={() => navigate("/category/dining")}
                    >
                        Dining
                    </li>
                </ul>
            </nav>
        </div>
    );
}
