import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import appLogo from '../assets/logo.png';
import * as Icons from '@ant-design/icons';

const {
  EnvironmentOutlined,
  CloudOutlined,
  CalendarOutlined,
  MobileOutlined,
  ThunderboltOutlined,
  CloudDownloadOutlined,
  CloudSyncOutlined,
  CompassOutlined
} = Icons;

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <img src={appLogo} alt="SkyCast Logo" className="app-logo" />
          <h1>Welcome to <span className="brand-text">SkyCast</span></h1>
          <p className="hero-description">
            Get real-time weather updates and forecasts for any location worldwide.
            Stay prepared with accurate weather information at your fingertips.
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-button primary">Get Started</Link>
            <Link to="/login" className="cta-button secondary">Sign In</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="weather-animation">
            <CloudOutlined className="floating-cloud cloud1" />
            <CloudSyncOutlined className="floating-cloud cloud2" />
            <CloudDownloadOutlined className="floating-cloud cloud3" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Powerful Weather Features</h2>
          <p className="section-description">
            Experience comprehensive weather forecasting with our advanced features and intuitive interface
          </p>
          <div className="decorative-icons">
            <ThunderboltOutlined className="spinning" />
            <CloudOutlined className="floating" />
            <CompassOutlined className="rotating" />
          </div>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon location-icon">
              <EnvironmentOutlined className="main-icon" />
              <div className="icon-rings">
                <div className="ring ring1"></div>
                <div className="ring ring2"></div>
                <div className="ring ring3"></div>
              </div>
            </div>
            <h3>Smart Location Detection</h3>
            <p>Automatic location detection with support for multiple saved locations and custom location search worldwide.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon weather-icon">
              <CloudSyncOutlined className="main-icon" />
            </div>
            <h3>Real-Time Weather Data</h3>
            <p>Live updates for temperature, humidity, wind speed, precipitation, and atmospheric pressure with minute-by-minute accuracy.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon forecast-icon">
              <CalendarOutlined className="main-icon" />
              <div className="temp-indicators">
                <div className="temp-bar bar1"></div>
                <div className="temp-bar bar2"></div>
                <div className="temp-bar bar3"></div>
                <div className="temp-bar bar4"></div>
                <div className="temp-bar bar5"></div>
              </div>
            </div>
            <h3>Extended Forecast</h3>
            <p>Detailed 7-day forecast with hourly predictions, precipitation probability, and severe weather alerts.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon device-icon">
              <MobileOutlined className="main-icon" />
            </div>
            <h3>Cross-Platform Access</h3>
            <p>Seamless experience across all devices with real-time sync and offline support for your weather data.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <ThunderboltOutlined className="main-icon" />
            </div>
            <h3>Severe Weather Alerts</h3>
            <p>Instant notifications for extreme weather conditions, storms, and natural disasters in your area.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <CompassOutlined className="main-icon" />
            </div>
            <h3>Weather Maps</h3>
            <p>Interactive radar maps showing precipitation, temperature, wind patterns, and cloud coverage in real-time.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-header">
          <h2>How It Works</h2>
          <p className="section-description">
            Get started with SkyCast in three simple steps
          </p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create Account</h3>
            <p>Sign up for free and create your personalized weather dashboard.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Set Location</h3>
            <p>Choose your preferred location or enable automatic detection.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Get Updates</h3>
            <p>Receive real-time weather updates and forecasts instantly.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Users Say</h2>
          <p className="section-description">
            Join thousands of satisfied users who trust SkyCast for their weather needs
          </p>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"SkyCast has become my go-to weather app. The accuracy and real-time updates are impressive!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>Weather Enthusiast</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The 5-day forecast feature helps me plan my outdoor activities perfectly. Highly recommended!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="author-info">
                <h4>Michael Chen</h4>
                <p>Outdoor Sports Coach</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The interface is so intuitive and the location detection works flawlessly. Best weather app ever!"</p>
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
              <div className="author-info">
                <h4>Emily Rodriguez</h4>
                <p>Daily Commuter</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of users who trust SkyCast for accurate weather forecasts</p>
          <Link to="/signup" className="cta-button primary">Create Free Account</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
