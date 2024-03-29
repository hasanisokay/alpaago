import { useState, useEffect} from 'react';
import toast from 'react-hot-toast';
import Loader from './Loader';
const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchWeatherData = async (lat, lon) => {
      const apiKey = '5cd5ac331e4642e4475e4a5d2b6bc627';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        toast.error("Error fetching weather data. Please reload the page.");
        console.error('Error fetching weather data:', error);
      }
    };

    const fetchWeatherByIP = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://ipinfo.io/json?token=395d047da6533c');
        const data = await response.json();
        setLocation(data);
        const { loc } = data;
        const [lat, lon] = loc.split(',');
        fetchWeatherData(lat, lon);
      } catch (error) {
        // toast.error("Error fetching location data. Please reload the page.");
        console.error('Error fetching location data by IP:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeatherByIP();
  }, []);
  const getBackgroundImage = () => {
    if (!weather) return "https://i.ibb.co/BLZf1pR/pexels-pixabay-76969-50.webp";
    const weatherCondition = weather?.weather[0]?.main;
    switch (weatherCondition) {
      case 'Clear':
        return "https://i.ibb.co/TcjPYwH/pexels-brett-sayles-912364-50.webp";
      case 'Haze':
        return "https://i.ibb.co/9pqmXf0/pexels-david-selbert-8100784-optimized.webp";
      case 'Clouds':
        return "https://i.ibb.co/4pqS41n/pexels-pixabay-209831-50.webp";
      case 'Rain':
        return "https://i.ibb.co/rtrLdhw/pexels-kaique-rocha-125510-50.webp";
      default:
        return "https://i.ibb.co/BLZf1pR/pexels-pixabay-76969-50.webp";
    }
  };

  if (isLoading) return <Loader />;
console.log(location);
  return (
    <div className={`min-h-screen bg-cover bg-no-repeat`} style={{ backgroundImage: `url(${getBackgroundImage()})` }}>    
    {weather ? (
      <div className='weather-div'>
        <h2 className='text-3xl mb-4 text-center'>Your Location: {location?.city}, {location?.country}</h2>
        <p>Region: {location?.region}</p>
        <p>Timezone: {location?.timezone}</p>
        <h2 className='mt-4 font-semibold text-xl'>Weather In {location?.city}</h2>
        <p>Temperature: {weather?.main?.temp}°C</p>
        <p>{weather?.weather[0]?.main}</p>
        <p>Feels Like: {weather?.main?.feels_like}°C</p>
        <p>Humidity: {weather?.main?.humidity}%</p>
        <p>Cloudiness: {weather?.clouds?.all}%</p>
        <p>Wind Speed: {weather?.wind?.speed} m/s</p>
        <p>Sunrise: {new Date(weather?.sys?.sunrise * 1000).toLocaleTimeString()}</p>
        <p>Sunset: {new Date(weather?.sys?.sunset * 1000).toLocaleTimeString()}</p>
      </div>
    ) : (
      <p className="weather-div">Loading weather data...</p>
    )}
    </div>
  );
};

export default Weather;
