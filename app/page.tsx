'use client';

import { useState, useEffect } from 'react';
import { WalletConnect } from '@/components/WalletConnect';
import { RealCryptoIntegration } from '@/components/RealCryptoIntegration';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export default function Home() {
  const [gems, setGems] = useState(0);
  const [totalGems, setTotalGems] = useState(0);
  const [energy, setEnergy] = useState(1000);
  const [maxEnergy] = useState(1000);
  const [gemsPerTap, setGemsPerTap] = useState(1);
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [comboCount, setComboCount] = useState(0);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [totalTaps, setTotalTaps] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'First Tap', description: 'Tap for the first time', icon: '👆', unlocked: false },
    { id: '2', title: 'Gem Collector', description: 'Collect 1000 gems', icon: '💎', unlocked: false },
    { id: '3', title: 'Energy Master', description: 'Reach max energy', icon: '⚡', unlocked: false },
    { id: '4', title: 'Week Warrior', description: '7 day streak', icon: '🔥', unlocked: false },
  ]);

  // Load saved data
  useEffect(() => {
    const savedData = {
      totalGems: localStorage.getItem('totalGems'),
      energy: localStorage.getItem('energy'),
      lastLogin: localStorage.getItem('lastLogin'),
      level: localStorage.getItem('level'),
      xp: localStorage.getItem('xp'),
      streak: localStorage.getItem('streak'),
      totalTaps: localStorage.getItem('totalTaps'),
      gemsPerTap: localStorage.getItem('gemsPerTap'),
      achievements: localStorage.getItem('achievements'),
    };
    
    if (savedData.totalGems) setTotalGems(parseInt(savedData.totalGems));
    if (savedData.energy) setEnergy(parseInt(savedData.energy));
    if (savedData.lastLogin) setLastLogin(savedData.lastLogin);
    if (savedData.level) setLevel(parseInt(savedData.level));
    if (savedData.xp) setXp(parseInt(savedData.xp));
    if (savedData.streak) setStreak(parseInt(savedData.streak));
    if (savedData.totalTaps) setTotalTaps(parseInt(savedData.totalTaps));
    if (savedData.gemsPerTap) setGemsPerTap(parseInt(savedData.gemsPerTap));
    if (savedData.achievements) setAchievements(JSON.parse(savedData.achievements));
    
    checkDailyBonus(savedData.lastLogin);
  }, []);

  // Energy regeneration
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy(prev => {
        const newEnergy = Math.min(prev + 1, maxEnergy);
        localStorage.setItem('energy', newEnergy.toString());
        if (newEnergy === maxEnergy) unlockAchievement('3');
        return newEnergy;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [maxEnergy]);

  // Combo timer
  useEffect(() => {
    if (comboCount > 0) {
      const timer = setTimeout(() => {
        setComboCount(0);
        setMultiplier(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [comboCount]);

  const checkDailyBonus = (lastLoginDate: string | null) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (lastLoginDate !== today) {
      const bonus = 100 * level;
      const newStreak = lastLoginDate === yesterday ? streak + 1 : 1;
      
      setTotalGems(prev => {
        const newTotal = prev + bonus;
        localStorage.setItem('totalGems', newTotal.toString());
        return newTotal;
      });
      
      setStreak(newStreak);
      localStorage.setItem('streak', newStreak.toString());
      localStorage.setItem('lastLogin', today);
      
      if (newStreak >= 7) unlockAchievement('4');
      
      showNotification(`🎁 Daily Bonus: +${bonus} gems! 🔥 ${newStreak} day streak!`);
    }
  };

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const updated = prev.map(a => 
        a.id === id && !a.unlocked ? { ...a, unlocked: true } : a
      );
      localStorage.setItem('achievements', JSON.stringify(updated));
      const achievement = updated.find(a => a.id === id);
      if (achievement && achievement.unlocked) {
        showNotification(`🏆 Achievement Unlocked: ${achievement.title}!`);
      }
      return updated;
    });
  };

  const showNotification = (message: string) => {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: bold;
      z-index: 1000;
      box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      animation: slideDown 0.5s ease-out;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const levelUp = (currentXp: number) => {
    const xpNeeded = level * 100;
    if (currentXp >= xpNeeded) {
      const newLevel = level + 1;
      setLevel(newLevel);
      setXp(currentXp - xpNeeded);
      setGemsPerTap(prev => prev + 1);
      localStorage.setItem('level', newLevel.toString());
      localStorage.setItem('gemsPerTap', (gemsPerTap + 1).toString());
      showNotification(`🎉 Level Up! Now Level ${newLevel}! Gems per tap: ${gemsPerTap + 1}`);
    }
  };

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (energy < gemsPerTap) return;

    const earnedGems = gemsPerTap * multiplier;
    const newGems = gems + earnedGems;
    const newTotalGems = totalGems + earnedGems;
    const newEnergy = energy - gemsPerTap;
    const newXp = xp + 1;
    const newTotalTaps = totalTaps + 1;
    const newCombo = comboCount + 1;

    setGems(newGems);
    setTotalGems(newTotalGems);
    setEnergy(newEnergy);
    setXp(newXp);
    setTotalTaps(newTotalTaps);
    setComboCount(newCombo);

    if (newCombo > 10) setMultiplier(2);
    if (newCombo > 25) setMultiplier(3);
    if (newCombo > 50) setMultiplier(5);

    localStorage.setItem('totalGems', newTotalGems.toString());
    localStorage.setItem('energy', newEnergy.toString());
    localStorage.setItem('xp', newXp.toString());
    localStorage.setItem('totalTaps', newTotalTaps.toString());

    if (newTotalTaps === 1) unlockAchievement('1');
    if (newTotalGems >= 1000) unlockAchievement('2');

    levelUp(newXp);

    // Floating animation
    const x = e.clientX;
    const y = e.clientY;
    const floatingText = document.createElement('div');
    floatingText.textContent = multiplier > 1 ? `+${earnedGems} (x${multiplier})` : `+${earnedGems}`;
    floatingText.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      color: ${multiplier > 1 ? '#fbbf24' : '#10b981'};
      font-weight: bold;
      font-size: ${multiplier > 1 ? '32px' : '24px'};
      pointer-events: none;
      animation: float 1s ease-out;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(floatingText);
    setTimeout(() => floatingText.remove(), 1000);
  };

  const upgradeGemPower = () => {
    const cost = gemsPerTap * 500;
    if (totalGems >= cost) {
      setTotalGems(prev => prev - cost);
      setGemsPerTap(prev => prev + 1);
      localStorage.setItem('totalGems', (totalGems - cost).toString());
      localStorage.setItem('gemsPerTap', (gemsPerTap + 1).toString());
      showNotification(`⬆️ Upgraded! Gems per tap: ${gemsPerTap + 1}`);
    }
  };

  const upgradeEnergyMax = () => {
    const cost = 2000;
    if (totalGems >= cost) {
      showNotification('⚡ Max energy upgrade coming soon!');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-80px) scale(1.5); opacity: 0; }
        }
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Header */}
      <div className="p-4 flex justify-between items-center backdrop-blur-sm bg-white/5">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            💎 BaseTapper
          </h1>
          <p className="text-xs text-gray-400">Level {level} • {streak} day streak 🔥</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowWallet(!showWallet)}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90 transition text-sm font-bold"
          >
            💰 Wallet
          </button>
          <button 
            onClick={() => setShowStats(!showStats)}
            className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm"
          >
            📊 Stats
          </button>
          <button 
            onClick={() => setShowUpgrade(!showUpgrade)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition text-sm font-bold"
          >
            ⬆️ Upgrade
          </button>
        </div>
      </div>

      {/* Wallet Modal */}
      {showWallet && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowWallet(false)}>
          <div className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">💰 Crypto Wallet</h2>
            
            {/* Wallet Connect Component */}
            <div className="mb-4">
              <WalletConnect />
            </div>

            {/* Real Crypto Integration */}
            <div className="mt-4">
              <RealCryptoIntegration />
            </div>

            <button
              onClick={() => setShowWallet(false)}
              className="w-full mt-4 p-3 bg-white/10 rounded-xl text-white font-bold hover:bg-white/20 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Stats Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowStats(false)}>
          <div className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">📊 Your Stats</h2>
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-white/10 rounded-lg">
                <span>Total Taps</span>
                <span className="font-bold">{totalTaps.toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-3 bg-white/10 rounded-lg">
                <span>Total Gems Earned</span>
                <span className="font-bold text-emerald-400">{totalGems.toLocaleString()}</span>
              </div>
              <div className="flex justify-between p-3 bg-white/10 rounded-lg">
                <span>Current Level</span>
                <span className="font-bold text-blue-400">Level {level}</span>
              </div>
              <div className="flex justify-between p-3 bg-white/10 rounded-lg">
                <span>Gems Per Tap</span>
                <span className="font-bold text-yellow-400">{gemsPerTap}</span>
              </div>
              <div className="flex justify-between p-3 bg-white/10 rounded-lg">
                <span>Login Streak</span>
                <span className="font-bold text-orange-400">{streak} days 🔥</span>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-3">🏆 Achievements</h3>
              <div className="grid grid-cols-2 gap-2">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`p-3 rounded-lg text-center ${achievement.unlocked ? 'bg-gradient-to-br from-yellow-500 to-orange-500' : 'bg-white/10 opacity-50'}`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <div className="text-xs font-bold">{achievement.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUpgrade(false)}>
          <div className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-6 max-w-md w-full" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-4">⬆️ Upgrades</h2>
            <div className="space-y-3">
              <div className="p-4 bg-white/10 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">💎 Gem Power</span>
                  <span className="text-sm text-gray-400">Level {gemsPerTap}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">Increase gems per tap by 1</p>
                <button 
                  onClick={upgradeGemPower}
                  disabled={totalGems < gemsPerTap * 500}
                  className="w-full py-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
                >
                  Upgrade - {(gemsPerTap * 500).toLocaleString()} gems
                </button>
              </div>
              <div className="p-4 bg-white/10 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">⚡ Max Energy</span>
                  <span className="text-sm text-gray-400">Level 1</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">Increase max energy by 500</p>
                <button 
                  onClick={upgradeEnergyMax}
                  disabled={totalGems < 2000}
                  className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition"
                >
                  Upgrade - 2,000 gems
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="px-4 py-6">
        {/* Level Progress */}
        <div className="mb-4 bg-white/10 backdrop-blur-lg rounded-xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Level {level}</span>
            <span>{xp}/{level * 100} XP</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${(xp / (level * 100)) * 100}%` }}
            />
          </div>
        </div>

        {/* Gems Display */}
        <div className="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 mb-4 border border-emerald-500/30">
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-1">Total Gems</p>
            <p className="text-6xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
              {totalGems.toLocaleString()}
            </p>
            {comboCount > 10 && (
              <p className="text-yellow-400 font-bold mt-2 animate-pulse">
                🔥 COMBO x{multiplier}! ({comboCount} taps)
              </p>
            )}
          </div>
        </div>

        {/* Energy Bar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-300">⚡ Energy</span>
            <span className="text-sm font-bold">{energy}/{maxEnergy}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 h-4 rounded-full transition-all"
              style={{ width: `${(energy / maxEnergy) * 100}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Regenerates 1 per second</p>
        </div>

        {/* Tap Button */}
        <div className="flex justify-center items-center mb-6">
          <div
            onClick={handleTap}
            className={`relative w-72 h-72 rounded-full bg-gradient-to-br from-emerald-400 via-blue-500 to-purple-600 flex items-center justify-center text-9xl cursor-pointer transform transition-all shadow-2xl ${
              energy < gemsPerTap 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 active:scale-95'
            }`}
            style={{
              boxShadow: '0 20px 60px rgba(16, 185, 129, 0.4), inset 0 -10px 30px rgba(0,0,0,0.3)',
              animation: comboCount > 10 ? 'pulse 0.5s infinite' : 'none'
            }}
          >
            💎
            {energy < gemsPerTap && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
                <span className="text-2xl font-bold">No Energy!</span>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-emerald-400">{gemsPerTap}</p>
            <p className="text-xs text-gray-400">Per Tap</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-blue-400">{level}</p>
            <p className="text-xs text-gray-400">Level</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-orange-400">{streak}</p>
            <p className="text-xs text-gray-400">Day Streak</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 font-bold hover:opacity-90 transition shadow-lg">
            👥 Invite Friends<br/>
            <span className="text-sm text-gray-200">+500 gems each</span>
          </button>
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 font-bold hover:opacity-90 transition shadow-lg">
            🏆 Leaderboard<br/>
            <span className="text-sm text-gray-200">Top 100</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-6 text-center text-xs text-gray-500">
        <p>Built on Base 🔵 | Powered by $BTAP</p>
        <p className="mt-1">v1.0.0 • {totalTaps.toLocaleString()} total taps</p>
      </div>
    </main>
  );
}
