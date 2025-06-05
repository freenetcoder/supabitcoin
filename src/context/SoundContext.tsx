import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface SoundContextType {
  playSound: (sound: 'click' | 'coin' | 'upgrade' | 'error') => void;
  muted: boolean;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextType>({
  playSound: () => {},
  muted: false,
  toggleMute: () => {}
});

export const useSound = () => useContext(SoundContext);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [muted, setMuted] = useState(() => {
    const savedMute = localStorage.getItem('superbitcoin-muted');
    return savedMute ? JSON.parse(savedMute) : false;
  });
  
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const coinSoundRef = useRef<HTMLAudioElement | null>(null);
  const upgradeSoundRef = useRef<HTMLAudioElement | null>(null);
  const errorSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem('superbitcoin-muted', JSON.stringify(muted));
  }, [muted]);

  useEffect(() => {
    clickSoundRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-arcade-mechanical-bling-210.mp3');
    coinSoundRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-coin-win-notification-1992.mp3');
    upgradeSoundRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-unlock-game-notification-253.mp3');
    errorSoundRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3');
    
    // Preload the sounds
    [clickSoundRef, coinSoundRef, upgradeSoundRef, errorSoundRef].forEach(ref => {
      if (ref.current) {
        ref.current.load();
      }
    });
    
    return () => {
      [clickSoundRef, coinSoundRef, upgradeSoundRef, errorSoundRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.currentTime = 0;
        }
      });
    };
  }, []);

  const playSound = (sound: 'click' | 'coin' | 'upgrade' | 'error') => {
    if (muted) return;
    
    const soundMap = {
      click: clickSoundRef,
      coin: coinSoundRef,
      upgrade: upgradeSoundRef,
      error: errorSoundRef
    };
    
    const audioRef = soundMap[sound];
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.error("Error playing sound:", err));
    }
  };

  const toggleMute = () => {
    setMuted(prev => !prev);
  };

  return (
    <SoundContext.Provider value={{ playSound, muted, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
};