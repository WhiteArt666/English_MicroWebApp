import React from 'react';

interface PixelBackgroundProps {
  pattern?: 'grass' | 'stone' | 'wood' | 'castle' | 'stars';
  animated?: boolean;
  opacity?: number;
}

export const PixelBackground: React.FC<PixelBackgroundProps> = ({ 
  pattern = 'grass', 
  animated = true,
  opacity = 0.15 
}) => {
  const getPatternStyle = () => {
    const patterns = {
      grass: {
        backgroundColor: '#4a5d23',
        backgroundImage: `
          linear-gradient(45deg, #5d7129 25%, transparent 25%), 
          linear-gradient(-45deg, #5d7129 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, #5d7129 75%), 
          linear-gradient(-45deg, transparent 75%, #5d7129 75%)
        `,
        backgroundSize: '8px 8px',
        backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
      },
      stone: {
        backgroundColor: '#6b6b6b',
        backgroundImage: `
          radial-gradient(circle at 25% 25%, #8b8b8b 2px, transparent 2px),
          radial-gradient(circle at 75% 75%, #4b4b4b 1px, transparent 1px)
        `,
        backgroundSize: '8px 8px'
      },
      wood: {
        backgroundColor: '#8b4513',
        backgroundImage: `
          linear-gradient(90deg, #a0522d 50%, transparent 50%),
          linear-gradient(#654321 50%, transparent 50%)
        `,
        backgroundSize: '4px 2px, 2px 4px'
      },
      castle: {
        backgroundColor: '#2c2c2c',
        backgroundImage: `
          linear-gradient(45deg, #404040 25%, transparent 25%), 
          linear-gradient(-45deg, #404040 25%, transparent 25%), 
          linear-gradient(45deg, transparent 75%, #404040 75%), 
          linear-gradient(-45deg, transparent 75%, #404040 75%)
        `,
        backgroundSize: '16px 16px',
        backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
      },
      stars: {
        backgroundColor: '#191970',
        backgroundImage: `
          radial-gradient(2px 2px at 20px 30px, #fff, transparent),
          radial-gradient(2px 2px at 40px 70px, #fff, transparent),
          radial-gradient(1px 1px at 90px 40px, #fff, transparent),
          radial-gradient(1px 1px at 130px 80px, #fff, transparent),
          radial-gradient(2px 2px at 160px 30px, #fff, transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px'
      }
    };

    return patterns[pattern];
  };

  return (
    <div 
      className={`pixel-background ${animated ? 'animated' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        opacity,
        ...getPatternStyle(),
        animation: animated ? `${pattern}Animation 20s linear infinite` : 'none'
      }}
    />
  );
};

// Floating particles for extra atmosphere
export const FloatingParticles: React.FC = () => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 20
  }));

  return (
    <div className="floating-particles">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  );
};
