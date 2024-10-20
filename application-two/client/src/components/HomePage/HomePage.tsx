import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-4xl font-bold text-center">
          Weather Monitoring App
        </h1>
        <p className="text-center text-lg mt-2">
          Stay updated with the latest weather conditions and alerts!
        </p>
      </header>

      <main className="flex-grow container mx-auto px-4 py-10">
        <section className="mb-10">
          <h2 className="text-3xl font-semibold mb-4 text-center">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold">
                Real-Time Weather Updates
              </h3>
              <p>
                Get live weather updates for your preferred city at your
                fingertips.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold">Custom Alerts</h3>
              <p>
                Set up thresholds for temperature and receive email
                notifications when conditions are met.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold">
                Historical Data Tracking
              </h3>
              <p>
                Access and analyze historical weather data for better insights.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold">
                Daily Aggregated Reports
              </h3>
              <p>
                Receive daily summaries of weather conditions using aggregated
                data for improved insights.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold">
                Sliding Window Data Processing
              </h3>
              <p>
                Efficiently processes and saves relevant data using a sliding
                window technique, ensuring optimal performance and storage.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold">User-Friendly Interface</h3>
              <p>
                Navigate easily through a clean and responsive design tailored
                for all devices.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="mb-4">
            To start using the Weather Monitoring App, please sign in or create
            an account.
          </p>
          <Link to="/signin" className="btn btn-primary mx-2">
            Sign In
          </Link>
          <Link to="/signup" className="btn btn-secondary mx-2">
            Sign Up
          </Link>
        </section>
      </main>

      <footer className="bg-blue-600 text-white p-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Weather Monitoring App. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
