'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [gems, setGems] = useState(0);
  const [totalGems, setTotalGems] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy] = useState(1000);
  const [gemsPerTap] = useState(1);
  const [lastLogin, setLastLogin] = useState<string | null>(null);

  // Load saved data
  useEffect(() => {
    const savedGems = localStorage.getItem('totalGems');
    const savedEnergy = localStorage.getItem('energy');
    const savedLastLogin = localStorage.getItem('lastLogin');
    
    if (savedGems) setTotalGems(parseInt(savedGems));
    if (savedEnergy) setEnergy(parseInt(savedEnergy));
    if (savedLastLogin) setLastLogin(savedLastLogin);
    
    // Check daily bonus
    checkDailyBonus(savedLastLogin);
  }, []);

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => {
        const newEnergy = Math.min(prev + 1, maxEnergy);
        localStorage.setItem('energy', newEnergy.toString());
        return newEnergy;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [maxEnergy]);

  const checkDailyBonus = (lastLoginDate: string | null) => {
    const today = new Date().toDateString();
    if (lastLoginDate !== today) {
      const bonus = 100;
      setTotalGems(prev => {
        const newTotal = prev + bonus;
        localStorage.setItem('totalGems', newTotal.toString());
        return newTotal;
      });
      localStorage.setItem('lastLogin', today);
      alert(`🎁 Daily Bonus: +${bonus} gems!`);
    }
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (energy < gemsPerTap) return;

    const newGems = gems + gemsPerTap;
    const newTotalGems = totalGems + gemsPerTap;
    const newEnergy = energy - gemsPerTap;

    setGems(newGems);
    setTotalGems(newTotalGems);
    setEnergy(newEnergy);

    localStorage.setItem('totalGems', newTotalGems.toString());
    localStorage.setItem('energy', newEnergy.toString());

    // Floating animation
    const x = e.clientX;
    const y = e.clientY;
    const floatingText = document.createElement('div');
    floatingText.textContent = `+${gemsPerTap}`;
    floatingText.style.position = 'fixed';
    floatingText.style.left = `${x}px`;
    floatingText.style.top = `${y}px`;
    floatingText.style.color = '#10b981';
    floatingText.style.fontWeight = 'bold';
    floatingText.style.fontSize = '24px';
    floatingText.style.pointerEvents = 'none';
    floatingText.style.animation = 'float 1s ease-out';
    document.body.appendChild(floatingText);
    setTimeout(() => floatingText.remove(), 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-black text-white">
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-50px); opacity: 0; }
        }
      `}</style>

      {/* Header */}
      <div className="p-6 text-center">
        <h1 className="text-4xl font-bold mb-2">💎 BaseTapper</h1>
        <p className="text-gray-300">Tap. Earn. Win!</p>
      </div>

      {/* Stats */}
      <div className="px-6 mb-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4">
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-1">Total Gems</p>
            <p className="text-5xl font-bold text-emerald-400">{totalGems.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">⚡ Energy</span>
            <span className="text-sm font-bold">{energy}/{maxEnergy}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all"
              style={{ width: `${(energy / maxEnergy) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tap Area */}
      <div className="flex justify-center items-center px-6 mb-8">
        <div
          onClick={handleTap}
          className={`w-64 h-64 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-8xl cursor-pointer transform transition-transform active:scale-95 shadow-2xl ${
            energy < gemsPerTap ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          💎
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 font-bold hover:opacity-90 transition">
          👥 Invite Friends<br/>
          <span className="text-sm text-gray-200">+500 gems</span>
        </button>
        <button className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 font-bold hover:opacity-90 transition">
          🏆 Leaderboard<br/>
          <span className="text-sm text-gray-200">Compete now</span>
        </button>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center text-sm text-gray-400">
        <p>Built on Base 🔵 | Powered by $BTAP</p>
      </div>
    </main>
  );
}
