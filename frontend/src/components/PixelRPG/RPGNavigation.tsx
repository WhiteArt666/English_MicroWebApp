import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RPGButton, RPGIcon } from './PixelComponents';
import './PixelRPG.css';

const RPGNavigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: 'fb1' },
    { path: '/lessons', label: 'Lessons', icon: 'fb10' },
    { path: '/game', label: 'Game', icon: 'fb20' },
    { path: '/community', label: 'Community', icon: 'fb30' },
    { path: '/profile', label: 'Profile', icon: 'fb40' },
    { path: '/login', label: 'Login', icon: 'fb50' },
    { path: '/register', label: 'Register', icon: 'fb60' },
  ];

  return (
    <nav style={{
      background: 'linear-gradient(145deg, #2F1B14, #1A1A1A)',
      borderBottom: '4px solid #654321',
      padding: '8px 16px',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '1200px',
        margin: '0 auto',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <RPGIcon iconId="fb1" size={32} />
            <span style={{
              fontFamily: '"Press Start 2P", cursive',
              fontSize: '10px',
              color: '#FFD700',
              textShadow: '1px 1px 0px rgba(0, 0, 0, 0.5)'
            }}>
              English Adventure
            </span>
          </div>
        </Link>

        {/* Navigation Items */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {navItems.slice(1).map((item) => (
            <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
              <RPGButton
                variant={location.pathname === item.path ? 'primary' : 'secondary'}
                size="small"
                icon={item.icon}
              >
                {item.label}
              </RPGButton>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default RPGNavigation;
