import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PixelScene } from '../components/PixelRPG/PixelScene';
import { 
  RPGButton, 
  RPGPanel, 
  XPBar, 
  HealthBar,
  CoinDisplay,
  QuestItem,
  Achievement,
  RPGIcon 
} from '../components/PixelRPG/PixelComponents';
import '../components/PixelRPG/PixelRPG.css';

const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const features = [
    { 
      icon: "fb300", 
      title: "Interactive Lessons", 
      description: "Learn English through engaging RPG-style quests and adventures" 
    },
    { 
      icon: "fb301", 
      title: "Real-time Multiplayer", 
      description: "Practice with other learners in collaborative challenges" 
    },
    { 
      icon: "fb302", 
      title: "Progress Tracking", 
      description: "Monitor your improvement with detailed analytics and achievements" 
    },
    { 
      icon: "fb303", 
      title: "Community Features", 
      description: "Join study groups, compete in leaderboards, and share knowledge" 
    }
  ];

  if (isAuthenticated) {
    return (
      <div className="rpg-container">
        <div className="rpg-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h1 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#FFD700' }}>
                Welcome back, {user?.username}!
              </h1>
              <p style={{ margin: 0, fontSize: '8px', opacity: 0.8 }}>
                Continue your English learning adventure
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <XPBar currentXP={750} maxXP={1000} level={5} />
              <HealthBar currentHP={85} maxHP={100} />
              <CoinDisplay amount={1250} />
            </div>
          </div>
        </div>

        <div className="rpg-main-content">
          <div>
            {/* Quick Actions */}
            <RPGPanel title="Quick Start" variant="default">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <Link to="/lessons">
                  <RPGButton variant="primary" size="large" icon="fb300">
                    Start Learning
                  </RPGButton>
                </Link>
                <Link to="/game">
                  <RPGButton variant="success" size="large" icon="fb301">
                    Play Games
                  </RPGButton>
                </Link>
                <Link to="/community">
                  <RPGButton variant="warning" size="large" icon="fb302">
                    Join Community
                  </RPGButton>
                </Link>
                <Link to="/profile">
                  <RPGButton variant="secondary" size="large" icon="fb303">
                    View Profile
                  </RPGButton>
                </Link>
              </div>
            </RPGPanel>

            {/* Recent Achievements */}
            <RPGPanel title="Recent Achievements" variant="default" className="mt-4">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Achievement
                  title="Vocabulary Master"
                  description="Learned 100 new words this week"
                  iconId="fb10"
                  unlocked={true}
                  rarity="rare"
                />
                <Achievement
                  title="Grammar Expert"
                  description="Completed advanced grammar section"
                  iconId="fb20"
                  unlocked={true}
                  rarity="epic"
                />
              </div>
            </RPGPanel>
          </div>

          <div className="rpg-sidebar">
            {/* Daily Quests */}
            <RPGPanel title="Daily Quests" variant="quest">
              <QuestItem
                title="Morning Practice"
                description="Complete 5 vocabulary exercises"
                reward={50}
                difficulty="easy"
                completed={false}
              />
              <QuestItem
                title="Grammar Challenge"
                description="Master present perfect tense"
                reward={100}
                difficulty="medium"
                completed={false}
              />
            </RPGPanel>

            {/* Learning Stats */}
            <RPGPanel title="Today's Progress" variant="stats">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive' }}>
                    Words Learned:
                  </span>
                  <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive', color: '#228B22' }}>
                    12/15
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive' }}>
                    Exercises Done:
                  </span>
                  <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive', color: '#228B22' }}>
                    8/10
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive' }}>
                    Study Time:
                  </span>
                  <span style={{ fontSize: '8px', fontFamily: '"Press Start 2P", cursive', color: '#228B22' }}>
                    45 min
                  </span>
                </div>
              </div>
            </RPGPanel>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rpg-container">
      <div className="rpg-header">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 16px 0', fontSize: '24px', color: '#FFD700' }}>
            English Adventure
          </h1>
          <p style={{ margin: '0 0 20px 0', fontSize: '10px', opacity: 0.9, lineHeight: 1.6 }}>
            Embark on an epic journey to master English through interactive RPG gameplay!<br />
            Level up your language skills, complete quests, and join a community of learners.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register">
              <RPGButton variant="primary" size="large" icon="fb400">
                Start Adventure
              </RPGButton>
            </Link>
            <Link to="/login">
              <RPGButton variant="secondary" size="large" icon="fb401">
                Continue Journey
              </RPGButton>
            </Link>
          </div>
        </div>
      </div>

      <div className="rpg-main-content">
        <div>
          {/* Features Section */}
          <RPGPanel title="Adventure Features" variant="default">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {features.map((feature, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(145deg, #F5E6D3, #E6D7C3)',
                  border: '3px solid #654321',
                  borderRadius: '8px',
                  padding: '16px',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <RPGIcon iconId={feature.icon} size={48} />
                  </div>
                  <h3 style={{ 
                    fontFamily: '"Press Start 2P", cursive', 
                    fontSize: '8px', 
                    margin: '0 0 8px 0',
                    color: '#2F1B14'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{ 
                    fontFamily: '"Press Start 2P", cursive', 
                    fontSize: '6px', 
                    lineHeight: 1.4, 
                    margin: 0,
                    opacity: 0.8,
                    color: '#2F1B14'
                  }}>
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </RPGPanel>

          {/* Demo Section */}
          <RPGPanel title="Game Preview" variant="default" className="mt-4">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <PixelScene />
              <p style={{ 
                marginTop: '16px', 
                fontSize: '8px', 
                fontFamily: '"Press Start 2P", cursive',
                opacity: 0.8 
              }}>
                Experience immersive 2D pixel art graphics and engaging RPG mechanics
              </p>
            </div>
          </RPGPanel>
        </div>

        <div className="rpg-sidebar">
          {/* Sample Quest */}
          <RPGPanel title="Sample Quest" variant="quest">
            <QuestItem
              title="Village Welcome"
              description="Meet the townspeople and learn basic greetings"
              reward={25}
              difficulty="easy"
              completed={false}
            />
          </RPGPanel>

          {/* Sample Achievement */}
          <RPGPanel title="Achievements" variant="default">
            <Achievement
              title="First Words"
              description="Learn your first English word"
              iconId="fb1"
              unlocked={false}
              rarity="common"
            />
            <Achievement
              title="Grammar Novice"
              description="Complete your first grammar lesson"
              iconId="fb10"
              unlocked={false}
              rarity="rare"
            />
          </RPGPanel>

          {/* Call to Action */}
          <RPGPanel title="Ready to Begin?" variant="default">
            <div style={{ textAlign: 'center' }}>
              <p style={{ 
                fontSize: '8px', 
                fontFamily: '"Press Start 2P", cursive',
                marginBottom: '16px',
                lineHeight: 1.4 
              }}>
                Join thousands of adventurers on their English learning quest!
              </p>
              <Link to="/register">
                <RPGButton variant="success" size="large">
                  Create Account
                </RPGButton>
              </Link>
            </div>
          </RPGPanel>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
