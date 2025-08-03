import React from 'react';

const LeaderboardPage: React.FC = () => {
  const leaderboard = [
    { rank: 1, username: "EnglishMaster", level: 25, experience: 12500, streak: 45 },
    { rank: 2, username: "WordWizard", level: 22, experience: 11200, streak: 32 },
    { rank: 3, username: "GrammarGuru", level: 20, experience: 10100, streak: 28 },
    { rank: 4, username: "StudyBuddy", level: 18, experience: 9200, streak: 15 },
    { rank: 5, username: "EnglishLearner01", level: 15, experience: 7500, streak: 22 },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Leaderboard</h1>
        <p className="text-gray-600">See how you stack up against other learners</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <h2 className="text-2xl font-semibold">Top Learners This Month</h2>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <div 
                key={user.rank} 
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                    user.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    user.rank === 2 ? 'bg-gray-300 text-gray-800' :
                    user.rank === 3 ? 'bg-orange-400 text-orange-900' :
                    'bg-indigo-100 text-indigo-800'
                  }`}>
                    {user.rank === 1 ? '🥇' : user.rank === 2 ? '🥈' : user.rank === 3 ? '🥉' : user.rank}
                  </div>
                  
                  <div>
                    <div className="font-semibold text-lg">{user.username}</div>
                    <div className="text-gray-500">Level {user.level}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8 text-sm">
                  <div className="text-center">
                    <div className="font-semibold text-blue-600">{user.experience.toLocaleString()}</div>
                    <div className="text-gray-500">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{user.streak}</div>
                    <div className="text-gray-500">Day Streak</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">🔥 Longest Streaks</h3>
          <div className="space-y-3">
            {leaderboard.slice(0, 3).map((user, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{user.username}</span>
                <span className="font-semibold text-orange-600">{user.streak} days</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">⭐ Most Experience</h3>
          <div className="space-y-3">
            {leaderboard.slice(0, 3).map((user, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{user.username}</span>
                <span className="font-semibold text-blue-600">{user.experience.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-center">🎯 Highest Levels</h3>
          <div className="space-y-3">
            {leaderboard.slice(0, 3).map((user, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{user.username}</span>
                <span className="font-semibold text-purple-600">Level {user.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
