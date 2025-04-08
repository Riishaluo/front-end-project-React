import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const validationSchema = Yup.object({
        username: Yup.string().min(3, "Must be at least 3 characters").required("⚠ Username is required"),
        email: Yup.string().email("Invalid email address").required("⚠ Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("⚠ Password is required"),
    });

    const formik = useFormik({
        initialValues: { username: "", email: "", password: "" },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.get("http://localhost:3000/users");
                const users = response.data;
                const emailIsTaken = users.some((user) => user.email === values.email);
                const userNameIsTaken = users.some((user) => user.username === values.username);

                if (emailIsTaken || userNameIsTaken) {
                    setErrorMessage(emailIsTaken ? "⚠ Email is already in use." : "⚠ Username is already taken.");
                    return;
                }

                await axios.post("http://localhost:3000/users", values);
                console.log(values);
                setErrorMessage("");
                navigate("/login");
            } catch (error) {
                setErrorMessage("Something went wrong. Please try again!");
                console.log(error);
            }
        },
    });

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
            <div className="w-full max-w-sm p-6 bg-white rounded-2xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-gray-800">Create Account</h2>
                <p className="text-center text-gray-500 mb-4">Sign up to get started</p>

                {errorMessage && (
                    <div className="mb-4 p-2 text-center text-red-600 bg-red-100 border border-red-400 rounded">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            name="username"
                            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.username && formik.errors.username
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                            placeholder="Enter your username"
                            {...formik.getFieldProps("username")}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <p className="text-red-500 text-sm">{formik.errors.username}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.email && formik.errors.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                            placeholder="Enter your email"
                            {...formik.getFieldProps("email")}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm">{formik.errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            className={`w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 ${formik.touched.password && formik.errors.password
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-500"
                                }`}
                            placeholder="Enter your password"
                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                        Register
                    </button>
                </form>

                <p className="text-sm text-center text-gray-600 mt-4">
                    Already have an account?
                    <span onClick={() => navigate("/login")} className="text-blue-600 font-semibold hover:underline cursor-pointer"> Sign In</span>
                </p>
            </div>
        </div>
    );
}
