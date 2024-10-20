import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

const CitySearchModal: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!city) {
      toast.error("Please enter a city name.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URI + `?city=${city}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data.data);
      setWeatherData(response.data.data);
      setIsModalOpen(true);
      toast.success("Weather data fetched successfully!");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      toast.error("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWeatherData(null);
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Search for a City's Weather
      </h1>

      <form onSubmit={handleSubmit} className="flex justify-center mb-8">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="input input-bordered w-3/4 md:w-1/2"
        />
        <button
          type="submit"
          className="btn btn-primary ml-2"
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </form>

      {isModalOpen && weatherData && (
        <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
          <div className="modal-box relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Weather in {weatherData.name}
            </h2>
            <div className="flex items-center mb-4">
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
                className="w-16 h-16"
              />
              <p className="text-lg capitalize">
                {weatherData.weather[0].description}
              </p>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Temperature:</strong> {weatherData.main.temp}°C
              </p>
              <p>
                <strong>Feels Like:</strong> {weatherData.main.feels_like}°C
              </p>
              <p>
                <strong>Min Temp:</strong> {weatherData.main.temp_min}°C
              </p>
              <p>
                <strong>Max Temp:</strong> {weatherData.main.temp_max}°C
              </p>
              <p>
                <strong>Humidity:</strong> {weatherData.main.humidity}%
              </p>
              <p>
                <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CitySearchModal;
