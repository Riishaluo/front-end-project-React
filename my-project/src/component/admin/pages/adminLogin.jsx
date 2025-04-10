import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate()

    const predefinedEmail = "admin@gmail.com";
    const predefinedPassword = "admin123";

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
    });

    const initialValues = {
        email: "",
        password: "",
    };

    const handleSubmit = (values) => {
        if (
            values.email === predefinedEmail &&
            values.password === predefinedPassword
        ) {
            navigate("/admin/dashboard")
            setLoginError("");
        } else {
            setLoginError("Invalid email or password");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Enter email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-sm mt-1"
                            />
                        </div>

                        {loginError && (
                            <div className="text-red-600 text-sm text-center">{loginError}</div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default AdminLogin;
