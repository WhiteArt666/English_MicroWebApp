import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';

interface PixelCharacterProps {
  position: [number, number, number];
  color: string;
  isPlayer?: boolean;
}

const PixelCharacter: React.FC<PixelCharacterProps> = ({ position, color, isPlayer = false }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && isPlayer) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Character Body */}
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.6, 1, 0.3]} />
        <meshBasicMaterial color={hovered ? '#ff6b6b' : color} />
      </mesh>
      
      {/* Character Head */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.3]} />
        <meshBasicMaterial color={hovered ? '#ffdd59' : '#ffeaa7'} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.1, 0.75, 0.15]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="#2d3436" />
      </mesh>
      <mesh position={[0.1, 0.75, 0.15]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshBasicMaterial color="#2d3436" />
      </mesh>

      {isPlayer && (
        <Text
          position={[0, 1.5, 0]}
          fontSize={0.2}
          color="#00b894"
          anchorX="center"
          anchorY="middle"
        >
          Player
        </Text>
      )}
    </group>
  );
};

interface PixelBuildingProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  roofColor?: string;
  label?: string;
}

const PixelBuilding: React.FC<PixelBuildingProps> = ({ 
  position, 
  size, 
  color, 
  roofColor = '#e17055',
  label 
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Building Base */}
      <mesh
        position={[0, size[1] / 2, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={size} />
        <meshBasicMaterial color={hovered ? '#a29bfe' : color} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, size[1] + 0.2, 0]}>
        <boxGeometry args={[size[0] + 0.2, 0.4, size[2] + 0.2]} />
        <meshBasicMaterial color={roofColor} />
      </mesh>

      {/* Door */}
      <mesh position={[0, 0.3, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.3, 0.6, 0.02]} />
        <meshBasicMaterial color="#8b4513" />
      </mesh>

      {/* Windows */}
      <mesh position={[-0.3, 0.7, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.2, 0.2, 0.02]} />
        <meshBasicMaterial color="#74b9ff" />
      </mesh>
      <mesh position={[0.3, 0.7, size[2] / 2 + 0.01]}>
        <boxGeometry args={[0.2, 0.2, 0.02]} />
        <meshBasicMaterial color="#74b9ff" />
      </mesh>

      {label && hovered && (
        <Text
          position={[0, size[1] + 1, 0]}
          fontSize={0.15}
          color="#2d3436"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      )}
    </group>
  );
};

const PixelTree: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[0.2, 0.6, 0.2]} />
        <meshBasicMaterial color="#8b4513" />
      </mesh>
      
      {/* Leaves */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.8]} />
        <meshBasicMaterial color="#00b894" />
      </mesh>
      <mesh position={[0, 1.2, 0]}>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <meshBasicMaterial color="#00cec9" />
      </mesh>
    </group>
  );
};

const PixelCoin: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.15, 0.15, 0.05]} />
      <meshBasicMaterial color="#fdcb6e" />
    </mesh>
  );
};

export const PixelScene: React.FC = () => {
  return (
    <Canvas style={{ height: '400px', background: 'linear-gradient(to bottom, #74b9ff 0%, #81ecec 100%)' }}>
      <OrthographicCamera
        makeDefault
        position={[5, 5, 5]}
        zoom={50}
        near={0.1}
        far={1000}
      />
      
      {/* Ground */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="#55a3ff" />
      </mesh>

      {/* Grass patches */}
      {Array.from({ length: 15 }, (_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 15,
            -0.49,
            (Math.random() - 0.5) * 15
          ]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color="#00b894" />
        </mesh>
      ))}

      {/* Buildings */}
      <PixelBuilding
        position={[-3, 0, -2]}
        size={[1.5, 2, 1]}
        color="#6c5ce7"
        label="Learning Center"
      />
      <PixelBuilding
        position={[3, 0, -2]}
        size={[1.2, 1.8, 1]}
        color="#fd79a8"
        label="Community Hub"
      />
      <PixelBuilding
        position={[0, 0, -4]}
        size={[2, 2.5, 1.5]}
        color="#fdcb6e"
        label="Achievement Hall"
      />

      {/* Trees */}
      <PixelTree position={[-5, 0, 1]} />
      <PixelTree position={[5, 0, 1]} />
      <PixelTree position={[-2, 0, 3]} />
      <PixelTree position={[2, 0, 3]} />

      {/* Characters */}
      <PixelCharacter position={[0, 0, 0]} color="#e84393" isPlayer />
      <PixelCharacter position={[-1.5, 0, 1]} color="#00cec9" />
      <PixelCharacter position={[1.5, 0, 1]} color="#fd79a8" />

      {/* Floating Coins */}
      <PixelCoin position={[-2, 1.5, 0]} />
      <PixelCoin position={[2, 1.5, 0]} />
      <PixelCoin position={[0, 2, -1]} />

      {/* Ambient light */}
      <ambientLight intensity={0.8} />
    </Canvas>
  );
};
