import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  BookOpenIcon, 
  UsersIcon, 
  TrophyIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';

const Navigation: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-indigo-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-2 rounded-lg">
              <BookOpenIcon className="h-8 w-8" />
            </div>
            <span className="text-2xl font-bold text-gray-800">English Adventure</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
            >
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link 
                  to="/lessons" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <BookOpenIcon className="h-5 w-5" />
                  <span>Lessons</span>
                </Link>
                
                <Link 
                  to="/community" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <UsersIcon className="h-5 w-5" />
                  <span>Community</span>
                </Link>
                
                <Link 
                  to="/leaderboard" 
                  className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <TrophyIcon className="h-5 w-5" />
                  <span>Leaderboard</span>
                </Link>
              </>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* User Stats */}
                <div className="hidden md:flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <span className="text-purple-600 font-semibold">Level {user.level}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-600">💰 {user.coins}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-blue-600">⭐ {user.experience}</span>
                  </div>
                </div>

                {/* Profile & Logout */}
                <div className="flex items-center space-x-2">
                  <Link 
                    to="/profile" 
                    className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600"
                  >
                    <UserCircleIcon className="h-6 w-6" />
                    <span className="hidden md:inline">{user.username}</span>
                  </Link>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login" 
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
