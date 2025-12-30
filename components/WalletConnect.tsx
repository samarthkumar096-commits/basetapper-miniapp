'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [isOpen, setIsOpen] = useState(false);

  const shortAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleConnect = () => {
    if (isConnected) {
      setIsOpen(true);
    } else {
      const coinbaseConnector = connectors.find(c => c.name === 'Coinbase Wallet');
      if (coinbaseConnector) {
        connect({ connector: coinbaseConnector });
      }
    }
  };

  return (
    <>
      <button
        onClick={handleConnect}
        className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white font-bold hover:opacity-90 transition shadow-lg"
      >
        {isConnected && address ? (
          <>
            🔵 {shortAddress(address)}
          </>
        ) : (
          <>
            🔗 Connect Wallet
          </>
        )}
      </button>

      {/* Wallet Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-gradient-to-br from-slate-800 to-purple-900 rounded-t-3xl p-6 w-full"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">Wallet</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl text-center">
                <p className="text-white font-bold">
                  {address && shortAddress(address)}
                </p>
              </div>

              <button
                onClick={() => {
                  disconnect();
                  setIsOpen(false);
                }}
                className="w-full p-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl text-white font-bold hover:opacity-90 transition"
              >
                🔄 Disconnect Wallet
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
