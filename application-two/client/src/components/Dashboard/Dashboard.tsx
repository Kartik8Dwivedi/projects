//@ts-nocheck

import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import WeatherModal from "./WeatherModal";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast/headless";

interface CityWeather {
  cityName: string;
  currentWeather: string;
  temp: number;
  icon: string;
  aggregatedData: {
    avgTemp: number;
    maxTemp: number;
    minTemp: number;
    dominantWeather: string;
    forecast: string;
  };
}

const Dashboard: React.FC = () => {
  // if the user is not authenticated, prevent access to the dashboard
  let token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      window.location.href = "/signin";
    }
    isAuthenticated();
  }, []);

  const [cityWeatherData, setCityWeatherData] = useState<CityWeather[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityWeather | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let token = localStorage.getItem("token");
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URI + `/data`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Ensure the data is an array
        if (Array.isArray(response.data.data)) {
          setCityWeatherData(response.data.data);
        } else {
          console.error("Expected array but received", response.data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherData();
  }, []);

  const openModal = (city: CityWeather) => {
    setSelectedCity(city);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCity(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {cityWeatherData.length > 0 ? (
          cityWeatherData.map((city, index) => {
            return (
              <WeatherCard
                key={city?.cityId}
                city={city}
                onClick={() => openModal(city)}
              />
            );
          })
        ) : (
          <p>No weather data available.</p>
        )}

        {selectedCity && (
          <WeatherModal
            city={selectedCity}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </>
  );
};

const isAuthenticated = async () => {
  try {
    let token = localStorage.getItem("token");
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_URI + "/authenticate",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status !== 200) {
      window.location.href = "/signin";
    }
  } catch (error) {
    window.location.href = "/signin";
  }
};
export default Dashboard;
