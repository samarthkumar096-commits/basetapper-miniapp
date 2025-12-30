'use client';

import { useState } from 'react';

export function InviteFriends() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate referral link (replace with real logic)
  const referralLink = `https://ni-sage.vercel.app?ref=USER123`;
  const referralCode = 'USER123';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join BaseTapper!',
        text: 'Tap to earn gems and win $BTAP tokens! Use my referral code to get bonus gems.',
        url: referralLink,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold hover:opacity-90 transition shadow-lg"
      >
        👥 Invite Friends
        <br />
        <span className="text-sm text-gray-200">+500 gems each</span>
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-2xl p-6 max-w-md w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">👥 Invite Friends</h2>
              <p className="text-gray-400 text-sm">Earn 500 gems for each friend!</p>
            </div>

            <div className="space-y-4">
              {/* Referral Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-white/10 rounded-xl text-center">
                  <p className="text-3xl font-bold text-emerald-400">0</p>
                  <p className="text-gray-400 text-sm">Friends</p>
                </div>
                <div className="p-4 bg-white/10 rounded-xl text-center">
                  <p className="text-3xl font-bold text-yellow-400">0</p>
                  <p className="text-gray-400 text-sm">Gems Earned</p>
                </div>
              </div>

              {/* Referral Code */}
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-gray-400 text-sm mb-2">Your Referral Code</p>
                <p className="text-white font-bold text-xl text-center">{referralCode}</p>
              </div>

              {/* Referral Link */}
              <div className="p-4 bg-white/10 rounded-xl">
                <p className="text-gray-400 text-sm mb-2">Your Referral Link</p>
                <p className="text-white text-sm break-all">{referralLink}</p>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleCopy}
                className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-bold hover:opacity-90 transition"
              >
                {copied ? '✅ Copied!' : '📋 Copy Link'}
              </button>

              <button
                onClick={handleShare}
                className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-bold hover:opacity-90 transition"
              >
                📤 Share with Friends
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full p-4 bg-white rounded-xl text-black font-bold hover:opacity-90 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
