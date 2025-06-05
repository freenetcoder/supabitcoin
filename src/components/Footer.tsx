import React from 'react';
import { Bitcoin, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-yellow-400" />
            <span className="text-lg font-bold">SuperBitcoin</span>
            <span className="text-xs bg-zinc-800 px-2 py-1 rounded-full">Meme Edition</span>
          </div>
          
          <div className="text-sm text-zinc-400">
            <p>This is a meme project. Not a real cryptocurrency.</p>
            <p>Have fun mining fake internet money!</p>
          </div>
          
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-zinc-800/50">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors p-2 rounded-full hover:bg-zinc-800/50">
              <Github size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} SuperBitcoin. All rights reserved to absolutely no one.</p>
          <p className="mt-1">Not affiliated with Bitcoin or any actual cryptocurrency.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;