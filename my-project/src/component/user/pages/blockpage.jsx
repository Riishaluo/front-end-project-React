import React from "react";
import { Link } from "react-router-dom";

export default function Blocked() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 p-6">
      <div className="max-w-md bg-white p-8 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Account Blocked</h1>
        <p className="text-gray-700 mb-6">
          Your account has been blocked by the administrator.
          <br />
          If you believe this is a mistake, please contact support.
        </p>
        <Link
          to="/login"
          className="inline-block px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
