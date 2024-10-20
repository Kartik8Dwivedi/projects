//@ts-nocheck
import React from "react";

interface WeatherModalProps {
  city: {
    cityName: string;
    aggregatedData: {
      avgTemp: number;
      maxTemp: number;
      minTemp: number;
      dominantWeather: string;
      forecast: string;
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

const WeatherModal: React.FC<WeatherModalProps> = ({
  city,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const avgTemp =
    Math.round(
      city.aggregatedData.dailyAggregates[
        city.aggregatedData.dailyAggregates.length - 1
      ].avgTemp * 10
    ) / 10;
  const maxTemp =
    Math.round(
      city.aggregatedData.dailyAggregates[
        city.aggregatedData.dailyAggregates.length - 1
      ].maxTemp * 10
    ) / 10;
  const minTemp =
    Math.round(
      city.aggregatedData.dailyAggregates[
        city.aggregatedData.dailyAggregates.length - 1
      ].minTemp * 10
    ) / 10;
  const dominantWeather =
    city.aggregatedData.dailyAggregates[
      city.aggregatedData.dailyAggregates.length - 1
    ].dominantWeather;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-secondary-content/90 p-8 rounded-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">
          {city.cityName} Weather Summary
        </h2>
        <p>
          Average Temperature: {avgTemp}
          °C
        </p>
        <p>Max Temperature: {maxTemp}°C</p>
        <p>Min Temperature: {minTemp}°C</p>
        <p>Dominant Weather: {dominantWeather}</p>
        <h3 className="text-xl font-semibold mt-4">Forecast</h3>
        <p>{city.aggregatedData.forecast}</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mt-6"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WeatherModal;
