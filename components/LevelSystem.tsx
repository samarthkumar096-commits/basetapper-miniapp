'use client';

import { useState } from 'react';

interface LevelTier {
  name: string;
  minPoints: number;
  color: string;
  icon: string;
}

const LEVEL_TIERS: LevelTier[] = [
  { name: 'Bronze', minPoints: 0, color: 'from-orange-700 to-orange-900', icon: '🥉' },
  { name: 'Silver', minPoints: 5000, color: 'from-gray-400 to-gray-600', icon: '🥈' },
  { name: 'Gold', minPoints: 25000, color: 'from-yellow-400 to-yellow-600', icon: '🥇' },
  { name: 'Platinum', minPoints: 100000, color: 'from-cyan-400 to-cyan-600', icon: '💎' },
  { name: 'Diamond', minPoints: 1000000, color: 'from-blue-400 to-blue-600', icon: '💠' },
  { name: 'Epic', minPoints: 2000000, color: 'from-purple-400 to-purple-600', icon: '🔮' },
  { name: 'Legendary', minPoints: 10000000, color: 'from-orange-400 to-red-600', icon: '👑' },
  { name: 'Master', minPoints: 50000000, color: 'from-pink-400 to-purple-600', icon: '⚡' },
  { name: 'GrandMaster', minPoints: 100000000, color: 'from-indigo-400 to-purple-600', icon: '🌟' },
  { name: 'Lord', minPoints: 1000000000, color: 'from-yellow-200 to-yellow-400', icon: '👑✨' },
];

interface Props {
  currentGems: number;
}

export function LevelSystem({ currentGems }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getCurrentTier = () => {
    for (let i = LEVEL_TIERS.length - 1; i >= 0; i--) {
      if (currentGems >= LEVEL_TIERS[i].minPoints) {
        return i;
      }
    }
    return 0;
  };

  const currentTierIndex = getCurrentTier();
  const currentTier = LEVEL_TIERS[currentTierIndex];
  const nextTier = LEVEL_TIERS[currentTierIndex + 1];

  const calculateProgress = () => {
    if (!nextTier) return 100;
    const progress = ((currentGems - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentTier.icon}</span>
            <span className="text-white font-bold">{currentTier.name}</span>
          </div>
          <span className="text-gray-400 text-sm">
            {currentTierIndex + 1} / {LEVEL_TIERS.length}
          </span>
        </div>
        
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${currentTier.color} progress-gradient transition-all duration-300`}
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        
        {nextTier && (
          <p className="text-gray-400 text-xs mt-1 text-right">
            {(nextTier.minPoints - currentGems).toLocaleString()} to {nextTier.name}
          </p>
        )}
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">🏅 Level Tiers</h2>
              <p className="text-gray-400 text-sm">Progress through ranks to unlock rewards</p>
            </div>

            <div className="space-y-3">
              {LEVEL_TIERS.map((tier, index) => {
                const isUnlocked = currentGems >= tier.minPoints;
                const isCurrent = index === currentTierIndex;
                
                return (
                  <div
                    key={tier.name}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isCurrent
                        ? `bg-gradient-to-r ${tier.color} border-white`
                        : isUnlocked
                        ? 'bg-white/10 border-emerald-500'
                        : 'bg-white/5 border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{tier.icon}</span>
                        <div>
                          <p className={`font-bold ${isCurrent ? 'text-white' : isUnlocked ? 'text-emerald-400' : 'text-gray-500'}`}>
                            {tier.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {tier.minPoints.toLocaleString()} gems
                          </p>
                        </div>
                      </div>
                      
                      {isUnlocked && (
                        <span className="text-2xl">
                          {isCurrent ? '⭐' : '✓'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-6 p-4 bg-white rounded-xl text-black font-bold hover:opacity-90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
