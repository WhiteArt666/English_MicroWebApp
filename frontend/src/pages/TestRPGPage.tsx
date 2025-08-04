import React from 'react';
import { 
  PixelCharacter, 
  RPGButton, 
  RPGPanel, 
  RPGIcon, 
  XPBar, 
  HealthBar, 
  CoinDisplay 
} from '../components/PixelRPG/PixelComponents';
import '../components/PixelRPG/PixelRPG.css';

const TestRPGPage: React.FC = () => {
  return (
    <div className="rpg-container">
      <div style={{ padding: '20px' }}>
        <h1 style={{ color: 'white', marginBottom: '20px' }}>RPG Components Test</h1>
        
        {/* Character Test */}
        <RPGPanel title="Character Test" className="mb-4">
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <PixelCharacter characterType="soldier" animation="idle" size="medium" />
            <PixelCharacter characterType="orc" animation="walk" size="medium" />
          </div>
        </RPGPanel>

        {/* Icons Test */}
        <RPGPanel title="Icons Test" className="mb-4">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(60px, 1fr))', gap: '10px', maxWidth: '400px' }}>
            <RPGIcon iconId="fb1" size={32} />
            <RPGIcon iconId="fb10" size={32} />
            <RPGIcon iconId="fb100" size={32} />
            <RPGIcon iconId="fb101" size={32} />
            <RPGIcon iconId="fb102" size={32} />
            <RPGIcon iconId="fb200" size={32} />
          </div>
        </RPGPanel>

        {/* Buttons Test */}
        <RPGPanel title="Buttons Test" className="mb-4">
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <RPGButton variant="primary">Primary</RPGButton>
            <RPGButton variant="secondary">Secondary</RPGButton>
            <RPGButton variant="success">Success</RPGButton>
            <RPGButton variant="danger">Danger</RPGButton>
            <RPGButton variant="warning">Warning</RPGButton>
          </div>
        </RPGPanel>

        {/* Status Bars Test */}
        <RPGPanel title="Status Bars Test" className="mb-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <XPBar currentXP={750} maxXP={1000} level={5} />
            <HealthBar currentHP={85} maxHP={100} />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CoinDisplay amount={1250} />
            </div>
          </div>
        </RPGPanel>
      </div>
    </div>
  );
};

export default TestRPGPage;
