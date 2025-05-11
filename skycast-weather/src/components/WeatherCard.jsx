import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Cloud, CloudRain, Sun, Wind, Droplets, ThermometerSun } from 'lucide-react';

const WeatherCard = ({ weather, forecast, airQuality }) => {
  if (!weather || !weather.current) return null;

  const { current, location } = weather;

  const getWeatherIcon = (code, isDay) => {
    // You can expand this based on weather codes
    switch (code) {
      case 1000:
        return <Sun className="h-12 w-12 text-yellow-500" />;
      case 1003:
        return <Cloud className="h-12 w-12 text-gray-500" />;
      default:
        return <CloudRain className="h-12 w-12 text-blue-500" />;
    }
  };

  const getUVIndexColor = (uv) => {
    if (uv <= 2) return 'text-green-500';
    if (uv <= 5) return 'text-yellow-500';
    if (uv <= 7) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{location.name}</CardTitle>
              <p className="text-gray-500">{location.region}, {location.country}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{Math.round(current.temp_c)}°C</div>
              <p className="text-gray-500">{current.condition.text}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <ThermometerSun className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">Feels like</p>
                <p className="font-semibold">{Math.round(current.feelslike_c)}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <Wind className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Wind</p>
                <p className="font-semibold">{current.wind_kph} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <Droplets className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-500">Humidity</p>
                <p className="font-semibold">{current.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-gray-50">
              <Sun className={`h-5 w-5 ${getUVIndexColor(current.uv)}`} />
              <div>
                <p className="text-sm text-gray-500">UV Index</p>
                <p className="font-semibold">{current.uv}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {airQuality && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Air Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">PM2.5</p>
                <p className="font-semibold">{Math.round(airQuality.pm2_5)} µg/m³</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">PM10</p>
                <p className="font-semibold">{Math.round(airQuality.pm10)} µg/m³</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">CO</p>
                <p className="font-semibold">{Math.round(airQuality.co)} µg/m³</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">NO2</p>
                <p className="font-semibold">{Math.round(airQuality.no2)} µg/m³</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {forecast && forecast.forecast && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">5-Day Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {forecast.forecast.forecastday.map((day) => (
                <div key={day.date} className="p-3 rounded-lg bg-gray-50 text-center">
                  <p className="text-sm text-gray-500">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                  {getWeatherIcon(day.day.condition.code, true)}
                  <div className="mt-2">
                    <p className="font-semibold">{Math.round(day.day.maxtemp_c)}°</p>
                    <p className="text-sm text-gray-500">{Math.round(day.day.mintemp_c)}°</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeatherCard; 