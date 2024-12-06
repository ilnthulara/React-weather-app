import React, { useState } from 'react';
//JavaScript library used for making HTTP requests. It's used here to fetch weather data from the OpenWeatherMap API
import axios from 'axios';

//functional component
const Weather = () => {
    //state variables
  const [weatherData, setWeatherData] = useState(null); //weatherData is used to store the weather data fetched from the API.
  const [city, setCity] = useState('');//city is used to store the city name entered by the user.

  const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

  //getWeather - make a GET request to the OpenWeatherMap API endpoint based on the user-entered city.
  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {weatherData && (
        <div>
          <h2>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;
