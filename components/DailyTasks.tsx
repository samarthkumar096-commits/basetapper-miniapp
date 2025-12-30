'use client';

import { useState, useEffect } from 'react';

interface DailyTask {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: number;
  timeLeft: string;
  completed: boolean;
}

export function DailyTasks() {
  const [isOpen, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState<DailyTask[]>([
    {
      id: '1',
      title: 'Daily Reward',
      description: 'Claim your daily login bonus',
      icon: '🎁',
      reward: 1000,
      timeLeft: '',
      completed: false,
    },
    {
      id: '2',
      title: 'Daily Cipher',
      description: 'Solve the daily puzzle',
      icon: '🔐',
      reward: 2000,
      timeLeft: '',
      completed: false,
    },
    {
      id: '3',
      title: 'Daily Combo',
      description: 'Complete the combo challenge',
      icon: '🎯',
      reward: 5000,
      timeLeft: '',
      completed: false,
    },
  ]);

  const calculateTimeLeft = (targetHour: number) => {
    const now = new Date();
    const target = new Date(now);
    target.setUTCHours(targetHour, 0, 0, 0);

    if (now.getUTCHours() >= targetHour) {
      target.setUTCDate(target.getUTCDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const updateCountdowns = () => {
      setTasks(prev => [
        { ...prev[0], timeLeft: calculateTimeLeft(0) },
        { ...prev[1], timeLeft: calculateTimeLeft(19) },
        { ...prev[2], timeLeft: calculateTimeLeft(12) },
      ]);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClaim = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    // Add gems to user balance here
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white font-bold hover:opacity-90 transition shadow-lg relative"
      >
        <span className="notification-dot"></span>
        📋 Daily Tasks
        <br />
        <span className="text-sm text-gray-200">Complete for rewards</span>
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
              <h2 className="text-3xl font-bold text-white mb-2">📋 Daily Tasks</h2>
              <p className="text-gray-400 text-sm">Complete tasks to earn bonus gems!</p>
            </div>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white/10 rounded-xl p-4 relative"
                >
                  {!task.completed && <div className="notification-dot"></div>}
                  
                  <div className="flex items-start gap-4">
                    <div className="text-5xl">{task.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{task.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <span className="text-yellow-400 font-bold">+{task.reward}</span>
                          <span className="text-gray-400 text-sm">gems</span>
                        </div>
                        
                        {!task.completed ? (
                          <div className="text-right">
                            <p className="text-gray-400 text-xs">Resets in</p>
                            <p className="text-white font-bold">{task.timeLeft}</p>
                          </div>
                        ) : (
                          <span className="text-green-400 font-bold">✓ Completed</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {!task.completed && (
                    <button
                      onClick={() => handleClaim(task.id)}
                      className="w-full mt-4 p-3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg text-white font-bold hover:opacity-90 transition"
                    >
                      Claim Reward
                    </button>
                  )}
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
