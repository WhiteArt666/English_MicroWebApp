import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  PlayIcon, 
  TrophyIcon, 
  UsersIcon, 
  BookOpenIcon,
  StarIcon,
  ChartBarIcon 
} from '@heroicons/react/24/outline';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    {
      icon: BookOpenIcon,
      title: "Interactive Lessons",
      description: "Learn English through gamified lessons from A1 to C2 levels"
    },
    {
      icon: TrophyIcon,
      title: "Achievements & Rewards",
      description: "Earn XP, coins, and unlock new content as you progress"
    },
    {
      icon: UsersIcon,
      title: "Community Learning",
      description: "Connect with other learners, share progress, and get help"
    },
    {
      icon: ChartBarIcon,
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics"
    }
  ];

  const stats = [
    { label: "Active Learners", value: "10K+" },
    { label: "Lessons Available", value: "500+" },
    { label: "Languages Levels", value: "6" },
    { label: "Success Rate", value: "95%" }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              English Adventure
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Level up your English skills through an immersive gaming experience. 
            Learn, practice, and master English from A1 to C2 levels.
          </p>
          
          {isAuthenticated ? (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
                <h3 className="text-xl font-semibold mb-4">Welcome back, {user?.username}!</h3>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">Level {user?.level}</div>
                    <div className="text-gray-500">Current Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{user?.experience}</div>
                    <div className="text-gray-500">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{user?.coins}</div>
                    <div className="text-gray-500">Coins</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Link 
                  to="/lessons" 
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2"
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Continue Learning</span>
                </Link>
                <Link 
                  to="/community" 
                  className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors flex items-center space-x-2"
                >
                  <UsersIcon className="h-5 w-5" />
                  <span>Join Community</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex justify-center space-x-4">
              <Link 
                to="/register" 
                className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center space-x-2"
              >
                <StarIcon className="h-5 w-5" />
                <span>Start Your Journey</span>
              </Link>
              <Link 
                to="/login" 
                className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Why Choose English Adventure?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 rounded-lg p-3 w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 rounded-3xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Join Our Growing Community
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-indigo-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Ready to Start Your English Adventure?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of learners who are improving their English skills every day.
          </p>
          {!isAuthenticated && (
            <Link 
              to="/register" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Start Learning for Free
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
