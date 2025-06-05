import React from 'react';
import { Activity, TrendingUp, BarChart3, Pickaxe } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const StatsPanel: React.FC = () => {
  const { balance, totalMined, clickPower, upgrades } = useWallet();
  
  // Calculate total upgrades purchased
  const totalUpgrades = Object.values(upgrades).reduce((sum, upgrade) => sum + upgrade.level, 0);
  
  return (
    <div className="bg-zinc-800/50 rounded-xl p-4 md:p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Activity className="h-5 w-5 text-blue-400" />
        Mining Stats
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard 
          title="Balance"
          value={balance.toLocaleString()}
          icon={<BarChart3 className="h-5 w-5 text-green-400" />}
        />
        
        <StatCard 
          title="Total Mined"
          value={totalMined.toLocaleString()}
          icon={<Pickaxe className="h-5 w-5 text-yellow-400" />}
        />
        
        <StatCard 
          title="Mining Power"
          value={`${clickPower.toLocaleString()}/click`}
          icon={<TrendingUp className="h-5 w-5 text-red-400" />}
        />
        
        <StatCard 
          title="Upgrades"
          value={totalUpgrades.toString()}
          icon={<Activity className="h-5 w-5 text-purple-400" />}
        />
      </div>
      
      <div className="mt-4 p-3 bg-zinc-700/30 rounded-lg">
        <h3 className="font-medium text-sm text-center mb-2">Mining Efficiency</h3>
        <div className="w-full bg-zinc-700 rounded-full h-2.5">
          <div 
            className="bg-gradient-to-r from-green-500 to-yellow-500 h-2.5 rounded-full"
            style={{ width: `${Math.min(clickPower / 100 * 100, 100)}%` }}
          ></div>
        </div>
        <div className="mt-1 flex justify-between text-xs text-zinc-400">
          <span>1 coin/click</span>
          <span>100+ coins/click</span>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-zinc-700/30 rounded-lg p-3 flex flex-col items-center justify-center text-center">
      <div className="mb-2">{icon}</div>
      <div className="text-sm text-zinc-400">{title}</div>
      <div className="font-mono font-medium">{value}</div>
    </div>
  );
};

export default StatsPanel;