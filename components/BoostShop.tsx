'use client';

import { useState } from 'react';

interface Boost {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  currentLevel: number;
  maxLevel: number;
  effect: string;
  multiplier: number;
}

export function BoostShop() {
  const [isOpen, setIsOpen] = useState(false);
  const [boosts, setBoosts] = useState<Boost[]>([
    {
      id: '1',
      name: 'Multitap',
      description: 'Increase gems per tap',
      icon: '👆',
      cost: 2000,
      currentLevel: 1,
      maxLevel: 20,
      effect: '+1 gem per tap',
      multiplier: 1,
    },
    {
      id: '2',
      name: 'Energy Limit',
      description: 'Increase max energy',
      icon: '⚡',
      cost: 1000,
      currentLevel: 1,
      maxLevel: 20,
      effect: '+500 max energy',
      multiplier: 500,
    },
    {
      id: '3',
      name: 'Recharging Speed',
      description: 'Faster energy regeneration',
      icon: '🔋',
      cost: 1500,
      currentLevel: 1,
      maxLevel: 10,
      effect: '+1 energy/sec',
      multiplier: 1,
    },
    {
      id: '4',
      name: 'Tap Bot',
      description: 'Auto-tap while offline',
      icon: '🤖',
      cost: 5000,
      currentLevel: 0,
      maxLevel: 10,
      effect: '+100 gems/hour',
      multiplier: 100,
    },
    {
      id: '5',
      name: 'Energy Bot',
      description: 'Auto-regenerate energy',
      icon: '⚙️',
      cost: 3000,
      currentLevel: 0,
      maxLevel: 5,
      effect: 'Full energy every 6h',
      multiplier: 1,
    },
  ]);

  const handleUpgrade = (boostId: string) => {
    setBoosts(prev =>
      prev.map(boost => {
        if (boost.id === boostId && boost.currentLevel < boost.maxLevel) {
          return {
            ...boost,
            currentLevel: boost.currentLevel + 1,
            cost: Math.floor(boost.cost * 1.5),
          };
        }
        return boost;
      })
    );
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-bold hover:opacity-90 transition shadow-lg"
      >
        🚀 Boost Shop
        <br />
        <span className="text-sm text-gray-200">Upgrade your power</span>
      </button>

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
              <h2 className="text-3xl font-bold text-white mb-2">🚀 Boost Shop</h2>
              <p className="text-gray-400 text-sm">Upgrade your mining power!</p>
            </div>

            <div className="space-y-4">
              {boosts.map((boost) => {
                const isMaxed = boost.currentLevel >= boost.maxLevel;
                
                return (
                  <div
                    key={boost.id}
                    className={`bg-white/10 rounded-xl p-4 ${isMaxed ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-5xl">{boost.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-white font-bold text-lg">{boost.name}</h3>
                          <span className="text-gray-400 text-sm">
                            Lv {boost.currentLevel}/{boost.maxLevel}
                          </span>
                        </div>
                        
                        <p className="text-gray-400 text-sm mt-1">{boost.description}</p>
                        
                        <div className="mt-3 p-2 bg-white/5 rounded-lg">
                          <p className="text-emerald-400 text-sm font-bold">{boost.effect}</p>
                        </div>

                        {!isMaxed ? (
                          <button
                            onClick={() => handleUpgrade(boost.id)}
                            className="w-full mt-3 p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg text-white font-bold hover:opacity-90 transition flex items-center justify-center gap-2"
                          >
                            <span>💎 {boost.cost.toLocaleString()}</span>
                            <span>Upgrade</span>
                          </button>
                        ) : (
                          <div className="w-full mt-3 p-3 bg-gray-700 rounded-lg text-center">
                            <span className="text-gray-400 font-bold">✓ Maxed Out</span>
                          </div>
                        )}
                      </div>
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
