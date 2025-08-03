import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const GamePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Game Dashboard</h1>
        <p className="text-gray-600">Choose your learning adventure!</p>
      </div>

      {/* User Progress Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">Level {user?.level}</div>
            <div className="text-gray-500">Current Level</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{user?.experience}</div>
            <div className="text-gray-500">Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">{user?.coins}</div>
            <div className="text-gray-500">Coins</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{user?.currentLanguageLevel}</div>
            <div className="text-gray-500">Language Level</div>
          </div>
        </div>
      </div>

      {/* Game Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-3">📚 Lessons</h3>
          <p className="text-gray-600 mb-4">Complete interactive lessons to gain experience</p>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Start Learning
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-3">🎮 Quiz Mode</h3>
          <p className="text-gray-600 mb-4">Test your knowledge with fun quizzes</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Take Quiz
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer">
          <h3 className="text-xl font-semibold mb-3">🗣️ Speaking Practice</h3>
          <p className="text-gray-600 mb-4">Practice pronunciation with AI</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
            Practice Speaking
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
