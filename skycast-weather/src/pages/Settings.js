import React from 'react';
import '../styles/Settings.css';

export default function Settings() {
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-grid">
        {/* General Settings */}
        <section className="settings-section">
          <h2>General Settings</h2>
          <div className="setting-item">
            <label htmlFor="temp-unit">Temperature Unit</label>
            <select id="temp-unit" defaultValue="celsius">
              <option value="celsius">Celsius</option>
              <option value="fahrenheit">Fahrenheit</option>
            </select>
          </div>
          <div className="setting-item">
            <label htmlFor="wind-unit">Wind Speed Unit</label>
            <select id="wind-unit" defaultValue="kmh">
              <option value="kmh">km/h</option>
              <option value="mph">mph</option>
            </select>
          </div>
        </section>

        {/* Notifications */}
        <section className="settings-section">
          <h2>Notifications</h2>
          <div className="setting-item">
            <label className="toggle-label" htmlFor="alerts">
              <input type="checkbox" id="alerts" />
              <span className="toggle-slider"></span>
              Weather Alerts
            </label>
          </div>
          <div className="setting-item">
            <label className="toggle-label" htmlFor="daily-updates">
              <input type="checkbox" id="daily-updates" />
              <span className="toggle-slider"></span>
              Daily Forecast Updates
            </label>
          </div>
        </section>

        {/* Location */}
        <section className="settings-section">
          <h2>Location</h2>
          <div className="setting-item">
            <label htmlFor="default-location">Default Location</label>
            <input id="default-location" type="text" placeholder="Enter city name" />
          </div>
          <div className="setting-item">
            <label className="toggle-label" htmlFor="use-current-location">
              <input type="checkbox" id="use-current-location" />
              <span className="toggle-slider"></span>
              Use Current Location
            </label>
          </div>
        </section>

        {/* Theme */}
        <section className="settings-section">
          <h2>Theme</h2>
          <div className="setting-item">
            <label htmlFor="theme">Color Theme</label>
            <select id="theme" defaultValue="light">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </section>
      </div>
      <div className="settings-actions">
        <button className="save-button" type="submit">Save Changes</button>
        <button className="reset-button" type="button">Reset to Default</button>
      </div>
    </div>
  );
}
