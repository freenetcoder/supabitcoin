import React, { useEffect, useState } from 'react';
import { Bitcoin } from 'lucide-react';

interface CoinParticleProps {
  x: number;
  y: number;
  value: number;
}

const CoinParticle: React.FC<CoinParticleProps> = ({ x, y, value }) => {
  const [position, setPosition] = useState({ x, y });
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  
  // Random direction for the particle
  const angle = Math.random() * Math.PI * 2;
  const distance = 30 + Math.random() * 70;
  const targetX = x + Math.cos(angle) * distance;
  const targetY = y - 100 - Math.random() * 50; // Always move upward

  useEffect(() => {
    const animateParticle = () => {
      setPosition({
        x: targetX,
        y: targetY,
      });
      setOpacity(0);
      setScale(0.5);
    };
    
    // Start animation after a small delay
    const timeout = setTimeout(animateParticle, 50);
    
    return () => clearTimeout(timeout);
  }, [targetX, targetY]);

  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: position.x,
        top: position.y,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)',
      }}
    >
      <div className="relative">
        <Bitcoin className="text-yellow-400 h-6 w-6" />
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-900/80 px-2 py-1 rounded text-sm font-mono text-white whitespace-nowrap">
          +{value}
        </div>
      </div>
    </div>
  );
};

export default CoinParticle;