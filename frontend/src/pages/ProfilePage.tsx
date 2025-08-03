import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Profile</h1>
        <p className="text-gray-600">Manage your adventure settings</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input 
                  type="text" 
                  value={user.username} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" 
                  disabled 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input 
                  type="email" 
                  value={user.email} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50" 
                  disabled 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Character Name</label>
                <input 
                  type="text" 
                  value={user.characterName || 'Not set'} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language Level</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                  <option value="A1">A1 - Beginner</option>
                  <option value="A2">A2 - Elementary</option>
                  <option value="B1">B1 - Intermediate</option>
                  <option value="B2">B2 - Upper Intermediate</option>
                  <option value="C1">C1 - Advanced</option>
                  <option value="C2">C2 - Proficiency</option>
                </select>
              </div>
            </div>
            <button className="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              Update Profile
            </button>
          </div>

          {/* Learning Statistics */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Learning Statistics</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">156</div>
                <div className="text-gray-600">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">23</div>
                <div className="text-gray-600">Current Streak</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">1250</div>
                <div className="text-gray-600">Study Time (min)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Game Stats */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Game Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Level</span>
                <span className="font-semibold text-purple-600">{user.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Experience</span>
                <span className="font-semibold text-blue-600">{user.experience}</span>
              </div>
              <div className="flex justify-between">
                <span>Coins</span>
                <span className="font-semibold text-yellow-600">{user.coins}</span>
              </div>
              <div className="flex justify-between">
                <span>Language Level</span>
                <span className="font-semibold text-green-600">{user.currentLanguageLevel}</span>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Achievements</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl">🏆</div>
                <div>
                  <div className="font-medium">Level Master</div>
                  <div className="text-sm text-gray-500">Reached level {user.level}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl">📚</div>
                <div>
                  <div className="font-medium">Knowledge Seeker</div>
                  <div className="text-sm text-gray-500">Completed 100+ lessons</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
