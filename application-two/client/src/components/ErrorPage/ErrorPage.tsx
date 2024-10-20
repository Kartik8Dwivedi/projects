import React from "react";
import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-500">404</h1>
        <h2 className="text-4xl font-semibold mt-4">Oops! Page not found</h2>
        <p className="mt-2 text-lg">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <p className="mt-2 text-lg">
          It might have been removed or you might have entered an incorrect URL.
        </p>
        <Link
          to="/dashboard"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
