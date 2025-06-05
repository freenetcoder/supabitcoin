import React, { createContext, useContext, useState, useEffect } from 'react';

interface WalletContextType {
  balance: number;
  totalMined: number;
  clickPower: number;
  upgrades: {
    [key: string]: {
      level: number;
      cost: number;
      power: number;
    };
  };
  addCoins: (amount: number) => void;
  purchaseUpgrade: (upgradeId: string) => boolean;
}

const defaultWalletContext: WalletContextType = {
  balance: 0,
  totalMined: 0,
  clickPower: 1,
  upgrades: {
    basicMiner: {
      level: 0,
      cost: 10,
      power: 1
    },
    advancedMiner: {
      level: 0,
      cost: 100,
      power: 5
    },
    superMiner: {
      level: 0,
      cost: 500,
      power: 25
    }
  },
  addCoins: () => {},
  purchaseUpgrade: () => false
};

const WalletContext = createContext<WalletContextType>(defaultWalletContext);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [walletState, setWalletState] = useState(() => {
    const savedState = localStorage.getItem('superbitcoin-wallet');
    return savedState ? JSON.parse(savedState) : defaultWalletContext;
  });

  // Calculate total click power based on upgrades
  const getTotalClickPower = (upgrades: typeof walletState.upgrades) => {
    let power = 1; // Base power
    Object.values(upgrades).forEach(upgrade => {
      power += upgrade.level * upgrade.power;
    });
    return power;
  };

  useEffect(() => {
    localStorage.setItem('superbitcoin-wallet', JSON.stringify(walletState));
  }, [walletState]);

  const addCoins = (amount: number) => {
    setWalletState(prev => ({
      ...prev,
      balance: prev.balance + amount,
      totalMined: prev.totalMined + amount
    }));
  };

  const purchaseUpgrade = (upgradeId: string): boolean => {
    const upgrade = walletState.upgrades[upgradeId];
    if (!upgrade) return false;

    const cost = upgrade.cost * Math.pow(1.5, upgrade.level);
    
    if (walletState.balance >= cost) {
      const newUpgrades = { ...walletState.upgrades };
      newUpgrades[upgradeId] = {
        ...upgrade,
        level: upgrade.level + 1
      };
      
      setWalletState(prev => ({
        ...prev,
        balance: prev.balance - cost,
        upgrades: newUpgrades,
        clickPower: getTotalClickPower(newUpgrades)
      }));
      return true;
    }
    return false;
  };

  const value = {
    ...walletState,
    addCoins,
    purchaseUpgrade
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};