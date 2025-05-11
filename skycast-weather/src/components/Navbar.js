import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';
import umbrellaBg from '../assets/umbrellabg.jpg';
import { FiMenu, FiX, FiUser, FiHome } from 'react-icons/fi';  // Import FiHome here

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    if (profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleProfileDropdownToggle = () => {
    setProfileDropdownOpen((prev) => !prev);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand" onClick={() => setMobileMenuOpen(false)}>
            <img src={umbrellaBg} alt="SkyCast" className="navbar-logo" />
            <span>SkyCast</span>
          </Link>

          <button className="hamburger" onClick={toggleMenu}>
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className={`navbar-center ${mobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`} onClick={toggleMenu}>
            <FiHome size={20} style={{ marginRight: '8px' }} /> {/* FiHome icon here */}
            Home
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`} onClick={toggleMenu}>
                Dashboard
              </Link>
              <Link to="/forecast" className={`nav-item ${isActive('/forecast') ? 'active' : ''}`} onClick={toggleMenu}>
                Forecast
              </Link>
              <Link to="/settings" className={`nav-item ${isActive('/settings') ? 'active' : ''}`} onClick={toggleMenu}>
                Settings
              </Link>
            </>
          )}
        </div>

        <div className={`navbar-right ${mobileMenuOpen ? 'open' : ''}`}>
          {isAuthenticated ? (
            <div className="user-profile-dropdown" ref={profileRef}>
              <button
                className="user-profile"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
                onClick={handleProfileDropdownToggle}
                aria-label="Open user menu"
              >
                <FiUser className="profile-icon" size={28} />
              </button>
              <div className="dropdown-menu" style={{ display: profileDropdownOpen ? 'block' : 'none' }}>
                <div className="profile-tooltip">{user?.name}</div>
                <Link to="/profile" className="dropdown-item profile-item" onClick={() => setProfileDropdownOpen(false)}>
                  Profile
                </Link>
                <Link to="/settings" className="dropdown-item settings-item" onClick={() => setProfileDropdownOpen(false)}>
                  Settings
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link to="/login" className="auth-btn login-btn" onClick={toggleMenu}>
                Login
              </Link>
              <Link to="/signup" className="auth-btn signup-btn" onClick={toggleMenu}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
