import React, { useEffect } from 'react';
import { Bitcoin, Code, Coffee, Heart, ExternalLink } from 'lucide-react';

const AboutPage: React.FC = () => {
  useEffect(() => {
    document.title = "About | SuperBitcoin";
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 mt-6">
          <h1 className="text-4xl font-bold">About SuperBitcoin</h1>
          <p className="text-xl text-zinc-400 mt-2">
            The story behind the world's most memeable cryptocurrency
          </p>
        </div>
        
        <div className="bg-zinc-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Bitcoin className="text-yellow-400" />
            What is SuperBitcoin?
          </h2>
          <p className="text-zinc-300 mb-4">
            SuperBitcoin is a <span className="text-yellow-400 font-medium">meme token</span> on the Solana blockchain that combines fun gameplay with real cryptocurrency.
          </p>
          <div className="mt-6 bg-zinc-900/50 rounded-lg p-4">
            <h3 className="font-medium mb-2 text-yellow-400">Contract Details</h3>
            <div className="font-mono text-sm break-all bg-black/30 p-3 rounded">
              [deploying..]
            </div>
            <div className="mt-4 flex justify-center">
              <a 
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-green-500 hover:bg-green-600 text-black px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Buy/Sell SuperBitcoin <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Code className="text-blue-400" />
            How It Works
          </h2>
          <p className="text-zinc-300 mb-4">
            The "mining" in SuperBitcoin is a fun game mechanic that lets you earn points and compete with others. While the game points are just for fun, the actual SuperBitcoin token can be traded on decentralized exchanges.
          </p>
          <p className="text-zinc-300">
            Your game progress is saved locally in your browser, separate from the actual token on the Solana blockchain.
          </p>
          
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="bg-zinc-700/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Play to Compete</h3>
              <p className="text-sm text-zinc-400">Mine SuperBitcoins in this fun game to compete for the highest score.</p>
            </div>
            <div className="bg-zinc-700/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Real Token</h3>
              <p className="text-sm text-zinc-400">The actual SuperBitcoin token exists on the Solana blockchain and can be traded.</p>
            </div>
            <div className="bg-zinc-700/20 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Community Driven</h3>
              <p className="text-sm text-zinc-400">Join our community and participate in the future of SuperBitcoin!</p>
            </div>
          </div>
        </div>
        
        <div className="bg-zinc-800/30 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Coffee className="text-brown-400" />
            The Team
          </h2>
          <p className="text-zinc-300 mb-4">
            SuperBitcoin was created by a team of developers and designers who wanted to bring a bit of humor to the world of cryptocurrency.
          </p>
          <p className="text-zinc-300">
            We believe that learning through play is one of the best ways to understand complex topics, and cryptocurrency is certainly a complex topic!
          </p>
        </div>
        
        <div className="bg-zinc-800/30 rounded-xl p-6 mb-8 text-center">
          <Heart className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Enjoyed Mining?</h2>
          <p className="text-zinc-300 mb-6">
            If you've had fun with SuperBitcoin, consider sharing it with your friends!
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-lg font-medium transition-colors">
              Share SuperBitcoin
            </button>
            <a 
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-1"
            >
              Buy Token <ExternalLink size={14} />
            </a>
          </div>
        </div>
        
        <div className="text-center text-zinc-500 text-sm mb-12">
          <p>SuperBitcoin is a meme token on the Solana blockchain. Please trade responsibly.</p>
          <p className="mt-2">© {new Date().getFullYear()} SuperBitcoin Meme Project</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;