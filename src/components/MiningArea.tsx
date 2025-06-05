import React, { useState, useEffect, useRef } from 'react';
import { Bitcoin, Zap } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useSound } from '../context/SoundContext';
import CoinParticle from './CoinParticle';

interface Particle {
  id: number;
  x: number;
  y: number;
  value: number;
}

const MiningArea: React.FC = () => {
  const { addCoins, clickPower } = useWallet();
  const { playSound } = useSound();
  const [isClicking, setIsClicking] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [particleId, setParticleId] = useState(0);
  const [lastBonusTime, setLastBonusTime] = useState(0);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusMultiplier, setBonusMultiplier] = useState(1);
  const miningAreaRef = useRef<HTMLDivElement>(null);

  // Handle mining click
  const handleMiningClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 150);
    
    // Get coordinates relative to the mining area
    const rect = miningAreaRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Check if bonus should be triggered (roughly 10% chance)
    const now = Date.now();
    let multiplier = 1;
    let value = clickPower;
    
    if (now - lastBonusTime > 5000 && Math.random() < 0.1) {
      multiplier = Math.floor(Math.random() * 5) + 2; // 2-6x multiplier
      value = clickPower * multiplier;
      
      setLastBonusTime(now);
      setShowBonus(true);
      setBonusMultiplier(multiplier);
      
      setTimeout(() => {
        setShowBonus(false);
      }, 2000);
      
      playSound('upgrade');
    } else {
      playSound('click');
    }
    
    // Add coins based on click power
    addCoins(value);
    
    // Create particles
    const newParticle = {
      id: particleId,
      x,
      y,
      value
    };
    
    setParticleId(prev => prev + 1);
    setParticles(prev => [...prev, newParticle]);
    
    // Play coin sound with slight delay for better feedback
    setTimeout(() => {
      playSound('coin');
    }, 100);
  };

  // Remove particles after animation
  useEffect(() => {
    if (particles.length > 0) {
      const timer = setTimeout(() => {
        setParticles(prev => prev.slice(1));
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [particles]);

  return (
    <div 
      ref={miningAreaRef}
      className="relative w-full max-w-md aspect-square mx-auto bg-zinc-800/50 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
      onClick={handleMiningClick}
    >
      <div className={`absolute inset-0 bg-yellow-500/10 rounded-full transition-transform duration-200 ${isClicking ? 'scale-95' : 'scale-100'}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-36 h-36 flex items-center justify-center rounded-full transition-all duration-200 ${isClicking ? 'scale-95 bg-yellow-500/20' : 'scale-100 bg-zinc-700/50'}`}>
            <Bitcoin 
              className={`h-20 w-20 transition-all duration-200 ${isClicking ? 'text-yellow-400 scale-95' : 'text-yellow-500/80 scale-100'}`}
            />
          </div>
        </div>
        
        {/* Concentric circles animation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 rounded-full border border-yellow-500/20 animate-ping-slow" />
          <div className="absolute w-56 h-56 rounded-full border border-yellow-500/10 animate-ping-slower" />
        </div>
        
        {/* Click here text */}
        <div className="absolute bottom-10 left-0 right-0 text-center">
          <div className="inline-block bg-zinc-800/80 px-3 py-1 rounded-full text-sm font-medium animate-bounce">
            Click to mine!
          </div>
        </div>
        
        {/* Click power indicator */}
        <div className="absolute top-10 left-0 right-0 text-center">
          <div className="inline-flex items-center gap-1 bg-zinc-800/80 px-3 py-1 rounded-full text-sm font-medium">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span>{clickPower} per click</span>
          </div>
        </div>
        
        {/* Bonus notification */}
        {showBonus && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-lg animate-scale-bounce">
              {bonusMultiplier}x BONUS!
            </div>
          </div>
        )}
      </div>
      
      {/* Coin particles */}
      {particles.map(particle => (
        <CoinParticle 
          key={particle.id}
          x={particle.x}
          y={particle.y}
          value={particle.value}
        />
      ))}
    </div>
  );
};

export default MiningArea;