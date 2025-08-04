import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

import './App.css';
import Navigation from './components/Navigation';
import RPGNavigation from './components/PixelRPG/RPGNavigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GamePage from './pages/GamePage';
import LessonsPage from './pages/LessonsPage';
import CommunityPage from './pages/CommunityPage';
import ProfilePage from './pages/ProfilePage';
import LeaderboardPage from './pages/LeaderboardPage';
import RPGLayout from './components/PixelRPG/RPGLayout';
import TestRPGPage from './pages/TestRPGPage';


const AppContent = () => {
  const location = useLocation();
  const isRPGMode = location.pathname === '/' || location.pathname === '/rpg' || location.pathname === '/test';

  return (
    <div className={isRPGMode ? '' : "App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"}>
      {isRPGMode ? <RPGNavigation /> : <Navigation />}
      <main className={isRPGMode ? '' : "container mx-auto px-4 py-8"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/lessons" element={<LessonsPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/rpg" element={<RPGLayout />} />
          <Route path="/test" element={<TestRPGPage />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <AppContent />
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
