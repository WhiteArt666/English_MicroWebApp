import React, { useState, useEffect } from 'react';
import './PixelRPG.css';

// Character Animation Component
interface CharacterProps {
  characterType: 'soldier' | 'orc';
  animation: 'idle' | 'walk' | 'attack01' | 'attack02' | 'hurt' | 'death';
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export const PixelCharacter: React.FC<CharacterProps> = ({ 
  characterType, 
  animation, 
  className = '', 
  size = 'medium' 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % 4); // Assuming 4 frames per animation
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  const characterPath = `/Assets/RPG-Characters/Tiny RPG Character Asset Pack v1.03 -Free Soldier&Orc/Characters(100x100)/${characterType === 'soldier' ? 'Soldier' : 'Orc'}/${characterType === 'soldier' ? 'Soldier' : 'Orc'}`;
  const animationFile = `${characterType === 'soldier' ? 'Soldier' : 'Orc'}-${animation === 'idle' ? 'Idle' : animation === 'walk' ? 'Walk' : animation === 'attack01' ? 'Attack01' : animation === 'attack02' ? 'Attack02' : animation === 'hurt' ? 'Hurt' : 'Death'}.png`;

  return (
    <div className={`pixel-character ${size} ${className}`}>
      <img 
        src={`${characterPath}/${animationFile}`}
        alt={`${characterType} ${animation}`}
        className="pixel-art"
        style={{ opacity: currentFrame > 0 ? 1 : 0.9 }} // Use currentFrame for subtle animation effect
      />
    </div>
  );
};

// RPG Icon Component
interface IconProps {
  iconId: string;
  size?: 16 | 24 | 32 | 48 | 64;
  className?: string;
  onClick?: () => void;
}

export const RPGIcon: React.FC<IconProps> = ({ iconId, size = 32, className = '', onClick }) => {
  // Use closest available size for assets
  const assetSize = size <= 16 ? 16 : size <= 32 ? 32 : 64;
  
  return (
    <div className={`rpg-icon ${className}`} onClick={onClick}>
      <img 
        src={`/Assets/Fantasy-Icons/Free-Raven-Fantasy-Icons/Separated-Files/${assetSize}x${assetSize}/${iconId}.png`}
        alt={`Icon ${iconId}`}
        className="pixel-art"
        style={{ width: size, height: size }}
        onError={(e) => {
          // Fallback to a default icon if the specific icon doesn't exist
          const target = e.target as HTMLImageElement;
          const prefix = assetSize === 16 ? 'fa' : assetSize === 32 ? 'fb' : 'fc';
          target.src = `/Assets/Fantasy-Icons/Free-Raven-Fantasy-Icons/Separated-Files/${assetSize}x${assetSize}/${prefix}1.png`;
        }}
      />
    </div>
  );
};

// RPG Button Component
interface RPGButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: string;
}

export const RPGButton: React.FC<RPGButtonProps> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  icon 
}) => {
  return (
    <button 
      className={`rpg-button rpg-button--${variant} rpg-button--${size} ${disabled ? 'disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <RPGIcon iconId={icon} size={16} className="button-icon" />}
      <span className="button-text">{children}</span>
    </button>
  );
};

// RPG Panel Component
interface RPGPanelProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  variant?: 'default' | 'quest' | 'inventory' | 'stats';
}

export const RPGPanel: React.FC<RPGPanelProps> = ({ children, title, className = '', variant = 'default' }) => {
  return (
    <div className={`rpg-panel rpg-panel--${variant} ${className}`}>
      {title && (
        <div className="rpg-panel__header">
          <h3 className="rpg-panel__title">{title}</h3>
        </div>
      )}
      <div className="rpg-panel__content">
        {children}
      </div>
    </div>
  );
};

// Experience Bar Component
interface XPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
  className?: string;
}

export const XPBar: React.FC<XPBarProps> = ({ currentXP, maxXP, level, className = '' }) => {
  const percentage = (currentXP / maxXP) * 100;
  
  return (
    <div className={`xp-bar ${className}`}>
      <div className="xp-bar__container">
        <div className="xp-bar__level">Lv.{level}</div>
        <div className="xp-bar__progress">
          <div 
            className="xp-bar__fill"
            style={{ width: `${percentage}%` }}
          />
          <span className="xp-bar__text">{currentXP} / {maxXP} XP</span>
        </div>
      </div>
    </div>
  );
};

// Health Bar Component
interface HealthBarProps {
  currentHP: number;
  maxHP: number;
  className?: string;
}

export const HealthBar: React.FC<HealthBarProps> = ({ currentHP, maxHP, className = '' }) => {
  const percentage = (currentHP / maxHP) * 100;
  
  return (
    <div className={`health-bar ${className}`}>
      <div className="health-bar__container">
        <RPGIcon iconId="fa1" size={16} className="health-icon" />
        <div className="health-bar__progress">
          <div 
            className="health-bar__fill"
            style={{ width: `${percentage}%` }}
          />
          <span className="health-bar__text">{currentHP} / {maxHP} HP</span>
        </div>
      </div>
    </div>
  );
};

// Coin Display Component
interface CoinDisplayProps {
  amount: number;
  className?: string;
}

export const CoinDisplay: React.FC<CoinDisplayProps> = ({ amount, className = '' }) => {
  return (
    <div className={`coin-display ${className}`}>
      <RPGIcon iconId="fa100" size={24} className="coin-icon" />
      <span className="coin-amount">{amount.toLocaleString()}</span>
    </div>
  );
};

// Quest Item Component
interface QuestItemProps {
  title: string;
  description: string;
  reward: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed?: boolean;
  onClick?: () => void;
}

export const QuestItem: React.FC<QuestItemProps> = ({ 
  title, 
  description, 
  reward, 
  difficulty, 
  completed = false,
  onClick 
}) => {
  const difficultyIcons = {
    easy: 'fa10',
    medium: 'fa11',
    hard: 'fa12'
  };

  return (
    <div className={`quest-item ${completed ? 'completed' : ''}`} onClick={onClick}>
      <div className="quest-item__header">
        <RPGIcon iconId={difficultyIcons[difficulty]} size={24} className="difficulty-icon" />
        <h4 className="quest-item__title">{title}</h4>
        {completed && <RPGIcon iconId="fa20" size={16} className="completed-icon" />}
      </div>
      <p className="quest-item__description">{description}</p>
      <div className="quest-item__footer">
        <CoinDisplay amount={reward} />
        <RPGButton 
          variant={completed ? 'success' : 'primary'} 
          size="small"
          disabled={completed}
        >
          {completed ? 'Completed' : 'Start Quest'}
        </RPGButton>
      </div>
    </div>
  );
};

// Achievement Badge Component
interface AchievementProps {
  title: string;
  description: string;
  iconId: string;
  unlocked?: boolean;
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

export const Achievement: React.FC<AchievementProps> = ({ 
  title, 
  description, 
  iconId, 
  unlocked = false,
  rarity = 'common' 
}) => {
  return (
    <div className={`achievement achievement--${rarity} ${unlocked ? 'unlocked' : 'locked'}`}>
      <div className="achievement__icon">
        <RPGIcon iconId={iconId} size={48} />
        {!unlocked && <div className="achievement__lock-overlay" />}
      </div>
      <div className="achievement__content">
        <h4 className="achievement__title">{title}</h4>
        <p className="achievement__description">{description}</p>
      </div>
    </div>
  );
};

// Inventory Slot Component
interface InventorySlotProps {
  item?: {
    iconId: string;
    name: string;
    quantity?: number;
  };
  onClick?: () => void;
}

export const InventorySlot: React.FC<InventorySlotProps> = ({ item, onClick }) => {
  return (
    <div className={`inventory-slot ${item ? 'filled' : 'empty'}`} onClick={onClick}>
      {item && (
        <>
          <RPGIcon iconId={item.iconId} size={32} />
          {item.quantity && item.quantity > 1 && (
            <span className="inventory-slot__quantity">{item.quantity}</span>
          )}
        </>
      )}
    </div>
  );
};
