import React, { useState } from 'react';
import {
  PixelCharacter,
  RPGButton,
  RPGPanel,
  XPBar,
  HealthBar,
  CoinDisplay,
  QuestItem,
  Achievement,
  InventorySlot
} from './PixelComponents';
import './PixelRPG.css';

interface UserStats {
  level: number;
  currentXP: number;
  maxXP: number;
  currentHP: number;
  maxHP: number;
  coins: number;
}

const RPGLayout: React.FC = () => {
  const [userStats] = useState<UserStats>({
    level: 5,
    currentXP: 750,
    maxXP: 1000,
    currentHP: 85,
    maxHP: 100,
    coins: 1250
  });

  const [selectedCharacter, setSelectedCharacter] = useState<'soldier' | 'orc'>('soldier');
  const [characterAnimation, setCharacterAnimation] = useState<'idle' | 'walk' | 'attack01'>('idle');

  const quests = [
    {
      title: "Master Basic Vocabulary",
      description: "Learn 50 basic English words",
      reward: 100,
      difficulty: 'easy' as const,
      completed: true
    },
    {
      title: "Grammar Champion",
      description: "Complete 10 grammar exercises",
      reward: 200,
      difficulty: 'medium' as const,
      completed: false
    },
    {
      title: "Conversation Master",
      description: "Complete advanced dialogue practice",
      reward: 500,
      difficulty: 'hard' as const,
      completed: false
    }
  ];

  const achievements = [
    {
      title: "First Steps",
      description: "Complete your first lesson",
      iconId: "fa1",
      unlocked: true,
      rarity: 'common' as const
    },
    {
      title: "Word Collector",
      description: "Learn 100 new words",
      iconId: "fa10",
      unlocked: true,
      rarity: 'rare' as const
    },
    {
      title: "Grammar Guru",
      description: "Master all grammar topics",
      iconId: "fa20",
      unlocked: false,
      rarity: 'epic' as const
    },
    {
      title: "English Master",
      description: "Reach maximum level",
      iconId: "fa30",
      unlocked: false,
      rarity: 'legendary' as const
    }
  ];

  const inventory: (({ iconId: string; name: string; quantity?: number } | undefined))[] = [
    { iconId: "fb100", name: "Gold Coin", quantity: 5 },
    { iconId: "fb101", name: "Health Potion", quantity: 3 },
    { iconId: "fb102", name: "Wisdom Scroll", quantity: 1 },
    undefined, undefined, undefined, undefined, undefined
  ];

  return (
    <div className="rpg-container">
      {/* Header */}
      <header className="rpg-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#FFD700' }}>
              English Adventure
            </h1>
            <p style={{ margin: 0, fontSize: '8px', opacity: 0.8 }}>
              Master English Through Epic Quests
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <XPBar 
              currentXP={userStats.currentXP} 
              maxXP={userStats.maxXP} 
              level={userStats.level}
            />
            <HealthBar 
              currentHP={userStats.currentHP} 
              maxHP={userStats.maxHP}
            />
            <CoinDisplay amount={userStats.coins} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="rpg-main-content">
        {/* Left Panel - Game Area */}
        <div>
          {/* Character Display */}
          <RPGPanel title="Your Character" variant="default">
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <PixelCharacter 
                characterType={selectedCharacter}
                animation={characterAnimation}
                size="large"
              />
              
              <div style={{ marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <RPGButton 
                  variant={selectedCharacter === 'soldier' ? 'primary' : 'secondary'}
                  onClick={() => setSelectedCharacter('soldier')}
                  icon="fb200"
                >
                  Soldier
                </RPGButton>
                <RPGButton 
                  variant={selectedCharacter === 'orc' ? 'primary' : 'secondary'}
                  onClick={() => setSelectedCharacter('orc')}
                  icon="fb201"
                >
                  Orc
                </RPGButton>
              </div>
              
              <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <RPGButton 
                  size="small"
                  variant={characterAnimation === 'idle' ? 'success' : 'secondary'}
                  onClick={() => setCharacterAnimation('idle')}
                >
                  Idle
                </RPGButton>
                <RPGButton 
                  size="small"
                  variant={characterAnimation === 'walk' ? 'success' : 'secondary'}
                  onClick={() => setCharacterAnimation('walk')}
                >
                  Walk
                </RPGButton>
                <RPGButton 
                  size="small"
                  variant={characterAnimation === 'attack01' ? 'success' : 'secondary'}
                  onClick={() => setCharacterAnimation('attack01')}
                >
                  Attack
                </RPGButton>
              </div>
            </div>
          </RPGPanel>

          {/* Learning Modules */}
          <RPGPanel title="Learning Modules" variant="default" className="mt-4">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <RPGButton icon="fb300" size="large">
                Vocabulary
              </RPGButton>
              <RPGButton icon="fb301" size="large">
                Grammar
              </RPGButton>
              <RPGButton icon="fb302" size="large">
                Listening
              </RPGButton>
              <RPGButton icon="fb303" size="large">
                Speaking
              </RPGButton>
            </div>
          </RPGPanel>
        </div>

        {/* Right Sidebar */}
        <div className="rpg-sidebar">
          {/* Quests Panel */}
          <RPGPanel title="Active Quests" variant="quest">
            {quests.map((quest, index) => (
              <QuestItem
                key={index}
                title={quest.title}
                description={quest.description}
                reward={quest.reward}
                difficulty={quest.difficulty}
                completed={quest.completed}
                onClick={() => console.log(`Starting quest: ${quest.title}`)}
              />
            ))}
          </RPGPanel>

          {/* Achievements Panel */}
          <RPGPanel title="Achievements" variant="default">
            {achievements.map((achievement, index) => (
              <Achievement
                key={index}
                title={achievement.title}
                description={achievement.description}
                iconId={achievement.iconId}
                unlocked={achievement.unlocked}
                rarity={achievement.rarity}
              />
            ))}
          </RPGPanel>

          {/* Inventory Panel */}
          <RPGPanel title="Inventory" variant="inventory">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 1fr)', 
              gap: '8px',
              maxWidth: '250px'
            }}>
              {inventory.map((item, index) => (
                <InventorySlot
                  key={index}
                  item={item}
                  onClick={() => console.log(`Clicked inventory slot ${index}`)}
                />
              ))}
            </div>
          </RPGPanel>

          {/* Quick Actions */}
          <RPGPanel title="Quick Actions" variant="default">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <RPGButton variant="primary" icon="fb400">
                Daily Challenge
              </RPGButton>
              <RPGButton variant="success" icon="fb401">
                Friend Battle
              </RPGButton>
              <RPGButton variant="warning" icon="fb402">
                Study Group
              </RPGButton>
              <RPGButton variant="secondary" icon="fb403">
                Settings
              </RPGButton>
            </div>
          </RPGPanel>
        </div>
      </div>

      {/* Floating Character */}
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000
      }}>
        <div style={{
          background: 'rgba(139, 69, 19, 0.9)',
          border: '3px solid #654321',
          borderRadius: '8px',
          padding: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <PixelCharacter 
            characterType="soldier"
            animation="idle"
            size="small"
          />
          <div style={{ 
            background: 'white',
            border: '2px solid #654321',
            borderRadius: '12px',
            padding: '8px',
            position: 'relative',
            color: '#2F1B14',
            fontSize: '6px',
            fontFamily: '"Press Start 2P", cursive'
          }}>
            Ready for adventure?
            <div style={{
              position: 'absolute',
              left: '-8px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: 0,
              height: 0,
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '8px solid white'
            }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPGLayout;
