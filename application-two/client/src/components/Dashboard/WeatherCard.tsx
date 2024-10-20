import React from "react";

interface WeatherCardProps {
  city: {
    cityName: string;
    temp: number;
    currentWeather: string;
    icon: string;
  };
  onClick: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, onClick }) => {
  return (
    <button
      className="bg-white shadow-lg rounded-lg p-6 cursor-pointer"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
      onTouchStart={onClick}
    >
      <div className="flex items-center">
        <img
          src={`http://openweathermap.org/img/wn/${
             //@ts-ignore
            city.weatherHistory[city.weatherHistory.length - 1].weather[0].icon
          }.png`}
          alt={city.currentWeather}
          className="w-12 h-12"
        />
        <div className="ml-4">
          <h2 className="text-xl font-semibold">{city.cityName}</h2>

          <p>
            {/* @ts-ignore */}
            {city.weatherHistory[0].weather[0].main}
          </p>
          <p className="text-2xl font-bold">
            {/* @ts-ignore */}
            {Math.round(city.weatherHistory[0].temp * 10) / 10}°C
          </p>
        </div>
      </div>
    </button>
  );
};

export default WeatherCard;
