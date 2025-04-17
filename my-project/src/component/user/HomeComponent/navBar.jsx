import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"


export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(null)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const navigate = useNavigate()
    const loggedUserId = localStorage.getItem("userId")

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            try {
                const response = await axios.get("http://localhost:3000/users")
                const users = response.data;
                const user = users.find((user) => String(user.id) === loggedUserId)

                if (user) {
                    setLoggedIn(user)
                }
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        };

        fetchLoggedInUser()
    }, [loggedUserId])

    const handleLogout = async () => {
        try {
            await axios.patch(`http://localhost:3000/users/${loggedUserId}`, {
                isLogged: false
            });

            localStorage.removeItem("userId")
            setLoggedIn(null)
            navigate("/")
        } catch (error) {
            console.error("Error during logout:", error)
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
                                navigate("/cart")
                            } else {
                                Swal.fire({
                                    icon: "warning",
                                    title: "Please Login",
                                    text: "You must be logged in to access your cart.",
                                    confirmButtonColor: "#d33",
                                })
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

                    {loggedIn ? (
                        <li className="relative list-none px-2 sm:px-4 cursor-pointer font-semibold">
                            <div onClick={() => setDropdownOpen(!dropdownOpen)}>
                                {loggedIn.username}
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
