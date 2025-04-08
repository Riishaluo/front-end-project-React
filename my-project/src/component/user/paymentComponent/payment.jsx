import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"


export default function Payment() {

    const navigate = useNavigate()

    const userId = localStorage.getItem("userId")

    const formik = useFormik({
        initialValues: {
            fullName: "",
            address: "",
            pincode: "",
            cardNumber: "",
            cvv: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Full Name is required"),
            address: Yup.string().required("Address is required"),
            pincode: Yup.string()
                .matches(/^\d{6}$/, "Pincode must be 6 digits")
                .required("Pincode is required"),
            cardNumber: Yup.string()
                .matches(/^\d{16}$/, "Card Number must be 16 digits")
                .required("Card Number is required"),
            cvv: Yup.string()
                .matches(/^\d{3}$/, "CVV must be 3 digits")
                .required("CVV is required"),
        }),
        onSubmit: async (values) => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:3000/users/${userId}`);
                const cart = response.data.cart;
        
                const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        
                await axios.post("http://localhost:3000/orderList", {
                    ...values,
                    userId,
                    totalAmount: totalPrice,
                    cart: cart
                });
        
                await axios.patch(`http://localhost:3000/users/${userId}`, {
                    cart: []
                });
        
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed!',
                    text: 'Your order has been successfully placed.',
                    confirmButtonColor: '#d33'
                }).then(() => {
                    navigate("/"); 
                });
        
            } catch (error) {
                console.error("Error placing order:", error);
        
                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'Something went wrong while placing your order.',
                    confirmButtonColor: '#d33'
                });
            }
        }
        
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg space-y-6">
                <h2 className="text-2xl font-bold text-center text-gray-800">Payment Details</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Full Name</label>
                        <input
                            name="fullName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.fullName}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Enter Your Name"
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.fullName}</p>
                        )}
                    </div>


                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Address</label>
                        <input
                            name="address"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.address}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Street, City, State"
                        />
                        {formik.touched.address && formik.errors.address && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.address}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Pincode</label>
                        <input
                            name="pincode"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.pincode}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="Enter your pincode"
                        />
                        {formik.touched.pincode && formik.errors.pincode && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.pincode}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Card Number</label>
                        <input
                            name="cardNumber"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cardNumber}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="1234 5678 9012 3456"
                        />
                        {formik.touched.cardNumber && formik.errors.cardNumber && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.cardNumber}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">CVV</label>
                        <input
                            name="cvv"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cvv}
                            className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                            placeholder="123"
                        />
                        {formik.touched.cvv && formik.errors.cvv && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.cvv}</p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
}


