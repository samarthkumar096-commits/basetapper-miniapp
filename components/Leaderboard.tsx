'use client';

import { useEffect, useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  address: string;
  gems: number;
  level: number;
}

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Mock leaderboard data (replace with real contract data)
    const mockData: LeaderboardEntry[] = [
      { rank: 1, address: '0x1234...5678', gems: 1500000, level: 50 },
      { rank: 2, address: '0x2345...6789', gems: 1200000, level: 45 },
      { rank: 3, address: '0x3456...7890', gems: 1000000, level: 42 },
      { rank: 4, address: '0x4567...8901', gems: 850000, level: 38 },
      { rank: 5, address: '0x5678...9012', gems: 750000, level: 35 },
      { rank: 6, address: '0x6789...0123', gems: 650000, level: 32 },
      { rank: 7, address: '0x7890...1234', gems: 550000, level: 28 },
      { rank: 8, address: '0x8901...2345', gems: 450000, level: 25 },
      { rank: 9, address: '0x9012...3456', gems: 350000, level: 22 },
      { rank: 10, address: '0x0123...4567', gems: 250000, level: 18 },
    ];
    setLeaderboard(mockData);
  }, []);

  const getRankEmoji = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl text-white font-bold hover:opacity-90 transition shadow-lg"
      >
        🏆 Leaderboard
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
              <h2 className="text-3xl font-bold text-white mb-2">🏆 Top Players</h2>
              <p className="text-gray-400 text-sm">Compete for the top spot!</p>
            </div>

            <div className="space-y-3">
              {leaderboard.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-4 rounded-xl flex items-center justify-between ${
                    entry.rank <= 3
                      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50'
                      : 'bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold w-12">
                      {getRankEmoji(entry.rank)}
                    </span>
                    <div>
                      <p className="text-white font-bold">{entry.address}</p>
                      <p className="text-gray-400 text-sm">Level {entry.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold">
                      {entry.gems.toLocaleString()}
                    </p>
                    <p className="text-gray-400 text-xs">gems</p>
                  </div>
                </div>
              ))}
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
