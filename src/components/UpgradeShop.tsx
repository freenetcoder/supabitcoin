import React from 'react';
import { Cpu, Zap, Server, TrendingUp } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useSound } from '../context/SoundContext';

interface UpgradeItem {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const upgradeItems: UpgradeItem[] = [
  {
    id: 'basicMiner',
    name: 'Basic Miner',
    description: 'A small USB miner. Adds +1 coin per click.',
    icon: <Cpu className="h-5 w-5 text-blue-400" />,
  },
  {
    id: 'advancedMiner',
    name: 'Advanced Miner',
    description: 'A dedicated mining rig. Adds +5 coins per click.',
    icon: <Server className="h-5 w-5 text-green-400" />,
  },
  {
    id: 'superMiner',
    name: 'Super Miner',
    description: 'Enterprise grade hardware. Adds +25 coins per click.',
    icon: <Zap className="h-5 w-5 text-yellow-400" />,
  },
];

const UpgradeShop: React.FC = () => {
  const { balance, upgrades, purchaseUpgrade } = useWallet();
  const { playSound } = useSound();

  const handlePurchase = (upgradeId: string) => {
    const success = purchaseUpgrade(upgradeId);
    if (success) {
      playSound('upgrade');
    } else {
      playSound('error');
    }
  };

  const calculateUpgradeCost = (id: string) => {
    const upgrade = upgrades[id];
    if (!upgrade) return 0;
    return Math.floor(upgrade.cost * Math.pow(1.5, upgrade.level));
  };

  return (
    <div className="bg-zinc-800/50 rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          Miner Upgrades
        </h2>
        <div className="text-sm bg-zinc-700/50 px-3 py-1 rounded-full">
          Balance: <span className="text-yellow-400 font-mono">{balance.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="grid gap-4">
        {upgradeItems.map(upgrade => {
          const cost = calculateUpgradeCost(upgrade.id);
          const level = upgrades[upgrade.id]?.level || 0;
          const canAfford = balance >= cost;
          
          return (
            <div key={upgrade.id} className="bg-zinc-700/30 rounded-lg p-4 transition-all hover:bg-zinc-700/50">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-800 rounded-lg">
                    {upgrade.icon}
                  </div>
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {upgrade.name}
                      {level > 0 && (
                        <span className="text-xs bg-zinc-600 px-2 py-0.5 rounded-full">
                          Lvl {level}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-zinc-400">{upgrade.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handlePurchase(upgrade.id)}
                  disabled={!canAfford}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    canAfford 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                      : 'bg-zinc-600 text-zinc-300 cursor-not-allowed'
                  }`}
                >
                  {cost} coins
                </button>
              </div>
              
              {level > 0 && (
                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
                  <span>Current boost:</span>
                  <span className="text-green-400 font-medium">
                    +{level * upgrades[upgrade.id].power} coins/click
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradeShop;