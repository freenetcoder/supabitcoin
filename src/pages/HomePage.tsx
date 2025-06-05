import React, { useEffect } from 'react';
import MiningArea from '../components/MiningArea';
import UpgradeShop from '../components/UpgradeShop';
import StatsPanel from '../components/StatsPanel';
import { useWallet } from '../context/WalletContext';
import { useSound } from '../context/SoundContext';
import { Share2 } from 'lucide-react';

const HomePage: React.FC = () => {
  const { totalMined } = useWallet();
  const { playSound } = useSound();
  
  useEffect(() => {
    // Set the page title
    document.title = "SuperBitcoin | Mine Your Meme Fortune";
  }, []);
  
  const handleShareClick = () => {
    playSound('click');
    
    const shareText = `I've mined ${totalMined.toLocaleString()} SuperBitcoins! Join the meme mining revolution at SuperBitcoin.org`;
    
    if (navigator.share) {
      navigator.share({
        title: 'SuperBitcoin Mining',
        text: shareText,
        url: window.location.href,
      }).catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback to clipboard copy
      navigator.clipboard.writeText(shareText)
        .then(() => {
          alert('Copied to clipboard! Share your mining success with friends!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-12 mt-6">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-transparent bg-clip-text">
          SuperBitcoin
        </h1>
        <p className="text-xl text-zinc-400 mt-2 max-w-2xl mx-auto">
          The next generation of totally real and not at all fake internet money.
        </p>
        <div className="flex justify-center mt-4">
          <button 
            onClick={handleShareClick}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 transition-colors px-4 py-2 rounded-full text-sm"
          >
            <Share2 size={16} />
            Share Your Mining Success
          </button>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
        <div className="flex flex-col items-center">
          <MiningArea />
          <div className="mt-4 text-center text-zinc-400 text-sm">
            <p>Click the coin to mine SuperBitcoins!</p>
            <p className="mt-1">Random bonus clicks have a chance to appear!</p>
          </div>
        </div>
        
        <div>
          <UpgradeShop />
        </div>
      </div>
      
      <div className="mb-12">
        <StatsPanel />
      </div>
      
      <div className="bg-zinc-800/30 rounded-xl p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-center">How SuperBitcoin Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <InfoCard 
            title="Click to Mine"
            description="Simply click on the big coin to mine SuperBitcoins. Each click earns you coins based on your mining power."
          />
          <InfoCard 
            title="Upgrade Your Setup"
            description="Spend your hard-earned SuperBitcoins on better mining equipment to increase your earnings per click."
          />
          <InfoCard 
            title="Find Bonuses"
            description="Keep an eye out for random bonus opportunities that can multiply your mining rewards!"
          />
        </div>
      </div>
    </div>
  );
};

interface InfoCardProps {
  title: string;
  description: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description }) => {
  return (
    <div className="bg-zinc-700/20 rounded-lg p-4 text-center hover:bg-zinc-700/30 transition-colors">
      <h3 className="text-lg font-medium text-yellow-400 mb-2">{title}</h3>
      <p className="text-zinc-300">{description}</p>
    </div>
  );
};

export default HomePage;