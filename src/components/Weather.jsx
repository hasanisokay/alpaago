import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Loader from './Loader';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchWeatherData = async (lat, lon) => {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        toast.error("Please reload this page.")
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchWeatherByIP = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://ip-api.com/json/`);
        const data = await response.json();
        setLocation(data);
        const { lat, lon } = data;
        fetchWeatherData(lat, lon);
      } catch (error) {
        toast.error("Reload this page. If error persists contact support.")
        console.error('Error fetching weather data by IP:', error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchWeatherByIP();
  }, []);

  if (isLoading) return <Loader />
  return (
    <div>
      {weather ? (
        <div className='text-center'>
          <h2 className='font-semibold text-2xl'>Your Location: {location?.city}, {location?.country}</h2>
          <p>Region: {location?.regionName}</p>
          <p>Timezone: {location?.timezone}</p>
          <p>Zip: {location?.zip}</p>
          <p>ISP: {location?.isp}</p>
          <h2 className='mt-4 font-semibold text-xl'>Weather In  {location?.city}</h2>
          <p>Temperature: {weather?.main?.temp}°C</p>
          <p>Feels Like: {weather?.main?.feels_like}°C</p>
          <p>Humidity: {weather?.main?.humidity}%</p>
          <p>Cloudiness: {weather?.clouds?.all}%</p>
          <p>Wind Speed: {weather?.wind?.speed} m/s</p>
          <p>Sunrise: {new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString()}</p>
          <p>Sunset: {new Date(weather?.sys?.sunset * 1000).toLocaleTimeString()}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Weather;
