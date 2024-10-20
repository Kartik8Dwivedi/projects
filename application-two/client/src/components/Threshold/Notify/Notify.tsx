import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Thresholds {
  temperature: {
    min: number | null;
    max: number | null;
  };
  weatherCondition: string;
}

const NotificationSetup: React.FC = () => {
  const [minTemp, setMinTemp] = useState<number | null>(null);
  const [maxTemp, setMaxTemp] = useState<number | null>(null);
  const [weatherCondition, setWeatherCondition] = useState<string>("");
  const [preferredCityId, setPreferredCityId] = useState<number | null>(null);

  const weatherConditions = [
    "Clouds",
    "Clear",
    "Tornado",
    "Squall",
    "Ash",
    "Dust",
    "Sand",
    "Fog",
    "Haze",
    "Smoke",
    "Mist",
    "Snow",
    "Rain",
    "Drizzle",
    "Thunderstorm",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const thresholds: Thresholds = {
      temperature: {
        min: minTemp,
        max: maxTemp,
      },
      weatherCondition,
    };

    if (!thresholds && !preferredCityId) {
      toast.error("Please fill triggers for notifications");
      return;
    }

    try {
        const token = localStorage.getItem("token");
      await axios.post(
        import.meta.env.VITE_BACKEND_URI + `/alerts`,
        { thresholds, preferredCityId, token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Notification preferences set successfully!");
      toast.success("You will now receive notifications based on your preferences.");
    } catch (error) {
      console.error("Error setting notification preferences:", error);
      toast.error("Error setting notification preferences. Please try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 overflow-hidden">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        Set Up Weather Notifications
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-2"
      >
        {/* Preferred City */}
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block font-semibold text-gray-700 mb-2"
          >
            Select Your City
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Mumbai", id: 1275339 },
              { name: "Hyderabad", id: 1269843 },
              { name: "Delhi", id: 1273294 },
              { name: "Chennai", id: 1264527 },
              { name: "Bengaluru", id: 1277333 },
              { name: "Kolkata", id: 1275004 },
            ].map((city) => (
              <label key={city.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  value={city.id}
                  checked={preferredCityId === city.id}
                  onChange={() => setPreferredCityId(city.id)}
                  className="radio radio-primary"
                  required
                />
                <span>{city.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Temperature Thresholds */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="minTemp"
              className="block font-semibold text-gray-700 mb-2"
            >
              Minimum Temperature (°C)
            </label>
            <input
              type="number"
              id="minTemp"
              value={minTemp || ""}
              onChange={(e) => setMinTemp(Number(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter min temperature"
            />
          </div>

          <div>
            <label
              className="block font-semibold text-gray-700 mb-2"
              htmlFor="maxTemp"
            >
              Maximum Temperature (°C)
            </label>
            <input
              type="number"
              value={maxTemp || ""}
              onChange={(e) => setMaxTemp(Number(e.target.value))}
              className="input input-bordered w-full"
              placeholder="Enter max temperature"
            />
          </div>
        </div>

        {/* Weather Condition (Dropdown) */}
        <div>
        <label htmlFor="weatherCondition" className="block font-semibold text-gray-700 mb-2">
            Select Weather Condition
        </label>
          <select
            className="select select-bordered w-full"
            value={weatherCondition}
            onChange={(e) => setWeatherCondition(e.target.value)}
          >
            <option value="" disabled>
              -- Select a weather condition --
            </option>
            {weatherConditions.map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Set Up Notifications
        </button>
      </form>
      <br />
    </div>
  );
};

export default NotificationSetup;
