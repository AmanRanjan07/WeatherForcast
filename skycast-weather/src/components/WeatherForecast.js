import React from 'react';
import { Row, Col, Tooltip } from 'antd';
import {
  CloudOutlined,
  ThunderboltOutlined,
  SwapOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import '../styles/WeatherForecast.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const WeatherForecast = ({ forecast }) => {
  const getWeatherIcon = (type) => {
    const icons = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Snow': '❄️',
      'Thunderstorm': '⛈️',
      'Drizzle': '🌦️',
      'Mist': '🌫️'
    };
    return icons[type] || '🌤️';
  };

  const getDayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(date);
    return days[d.getDay()];
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const chartData = forecast.map(day => ({
    name: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }),
    max: Math.round(day.temp_max),
    min: Math.round(day.temp_min)
  }));

  return (
    <>
      <div style={{ width: '100%', maxWidth: 1100, margin: '0 auto', marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 14, fill: '#64748b' }} />
            <YAxis tick={{ fontSize: 14, fill: '#64748b' }} domain={['auto', 'auto']} />
            <RechartsTooltip contentStyle={{ borderRadius: 12, fontSize: 15 }} />
            <Line type="monotone" dataKey="max" stroke="#ef4444" strokeWidth={3} dot={{ r: 5 }} name="Max Temp" />
            <Line type="monotone" dataKey="min" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} name="Min Temp" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="forecast-row">
        {forecast?.map((day, index) => (
          <div className="forecast-card" key={index}>
            <div className="forecast-date">
              <h4>{getDayName(day.date)}</h4>
              <span>{formatDate(day.date)}</span>
            </div>
            <div className="forecast-icon">
              {getWeatherIcon(day.type)}
            </div>
            <div className="forecast-temps">
              <Tooltip title="Maximum Temperature">
                <div className="temp max">
                  <span>{Math.round(day.temp_max)}°</span>
                </div>
              </Tooltip>
              <SwapOutlined className="temp-divider" />
              <Tooltip title="Minimum Temperature">
                <div className="temp min">
                  <span>{Math.round(day.temp_min)}°</span>
                </div>
              </Tooltip>
            </div>
            <div className="forecast-details">
              <Tooltip title="Humidity">
                <div className="detail-item">
                  <CloudOutlined />
                  <span>{day.humidity}%</span>
                </div>
              </Tooltip>
              <Tooltip title="Wind Speed">
                <div className="detail-item">
                  <DashboardOutlined />
                  <span>{Math.round(day.wind_speed)} km/h</span>
                </div>
              </Tooltip>
              <Tooltip title="Precipitation">
                <div className="detail-item">
                  <ThunderboltOutlined />
                  <span>{day.precipitation || 0}%</span>
                </div>
              </Tooltip>
            </div>
            <div className="forecast-desc">{day.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WeatherForecast; 