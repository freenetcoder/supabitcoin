import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { WalletProvider } from './context/WalletContext';
import { SoundProvider } from './context/SoundContext';

function App() {
  return (
    <SoundProvider>
      <WalletProvider>
        <Router>
          <div className="flex flex-col min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </WalletProvider>
    </SoundProvider>
  );
}

export default App;