import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin, Menu, X, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useSound } from '../context/SoundContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { balance } = useWallet();
  const { muted, toggleMute } = useSound();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-900/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
            <Bitcoin className="h-8 w-8 animate-pulse" />
            <span className="hidden sm:inline">SuperBitcoin</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://pump.fun/coin/67jtxHSBzZjmW2QzfYr8RDcSSZexM4ycbmnvkuxtpump" 
              className="hidden md:flex items-center gap-1 bg-green-500 hover:bg-green-600 text-black px-4 py-1.5 rounded-full text-sm font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Buy/Sell</span>
              <ExternalLink size={14} />
            </a>
            
            <div className="bg-zinc-800/80 px-3 py-1 rounded-full flex items-center gap-2">
              <Bitcoin className="h-4 w-4 text-yellow-400" />
              <span className="font-mono">{balance.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-zinc-800/50 transition-colors"
            >
              {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            
            <div className="md:hidden">
              <button onClick={toggleMenu} className="p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link>
              <Link to="/about" className="hover:text-yellow-400 transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-sm">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <Link to="/" className="py-2 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="py-2 hover:text-yellow-400 transition-colors" onClick={toggleMenu}>About</Link>
            <a 
              href="#" 
              className="py-2 text-green-500 hover:text-green-400 transition-colors flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={toggleMenu}
            >
              Buy/Sell <ExternalLink size={14} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;