'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { formatEther, parseEther } from 'viem';

// Contract addresses (update after deployment)
const TOKEN_ADDRESS = '0x...'; // BTAP token address
const FAUCET_ADDRESS = '0x...'; // Faucet address

const TOKEN_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'player', type: 'address' }],
    name: 'getRemainingDailyMint',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

const FAUCET_ABI = [
  {
    inputs: [],
    name: 'claimTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'canClaim',
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getTimeUntilNextClaim',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export function RealCryptoIntegration() {
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState('0');
  const [canClaim, setCanClaim] = useState(false);
  const [timeUntilClaim, setTimeUntilClaim] = useState(0);

  // Read token balance
  const { data: balanceData } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Read faucet claim status
  const { data: canClaimData } = useReadContract({
    address: FAUCET_ADDRESS,
    abi: FAUCET_ABI,
    functionName: 'canClaim',
    args: address ? [address] : undefined,
  });

  // Read time until next claim
  const { data: timeData } = useReadContract({
    address: FAUCET_ADDRESS,
    abi: FAUCET_ABI,
    functionName: 'getTimeUntilNextClaim',
    args: address ? [address] : undefined,
  });

  // Write contract for claiming
  const { writeContract, isPending } = useWriteContract();

  useEffect(() => {
    if (balanceData) {
      setBalance(formatEther(balanceData as bigint));
    }
  }, [balanceData]);

  useEffect(() => {
    if (canClaimData !== undefined) {
      setCanClaim(canClaimData as boolean);
    }
  }, [canClaimData]);

  useEffect(() => {
    if (timeData) {
      setTimeUntilClaim(Number(timeData));
    }
  }, [timeData]);

  const handleClaim = async () => {
    if (!canClaim) return;

    try {
      await writeContract({
        address: FAUCET_ADDRESS,
        abi: FAUCET_ABI,
        functionName: 'claimTokens',
      });
    } catch (error) {
      console.error('Claim failed:', error);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  if (!isConnected) {
    return (
      <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border-2 border-yellow-500/50">
        <div className="text-center">
          <p className="text-2xl mb-2">💰</p>
          <p className="text-white font-bold mb-2">Real Crypto Integration</p>
          <p className="text-gray-400 text-sm">Connect wallet to see your BTAP balance</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Token Balance */}
      <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border-2 border-yellow-500/50">
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">Your BTAP Balance</p>
          <p className="text-4xl font-bold text-yellow-400 mb-2">
            {parseFloat(balance).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
          <p className="text-gray-400 text-xs">BTAP Tokens</p>
        </div>
      </div>

      {/* Faucet */}
      <div className="p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border-2 border-blue-500/50">
        <div className="text-center">
          <p className="text-2xl mb-2">🚰</p>
          <p className="text-white font-bold mb-2">Testnet Faucet</p>
          <p className="text-gray-400 text-sm mb-4">Claim 1,000 BTAP every 24 hours</p>

          {canClaim ? (
            <button
              onClick={handleClaim}
              disabled={isPending}
              className="w-full p-4 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl text-white font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {isPending ? '⏳ Claiming...' : '🎁 Claim 1,000 BTAP'}
            </button>
          ) : (
            <div className="p-4 bg-white/10 rounded-xl">
              <p className="text-gray-400 text-sm">Next claim in:</p>
              <p className="text-white font-bold text-xl">{formatTime(timeUntilClaim)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Token Info */}
      <div className="p-4 bg-white/5 rounded-xl">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Token Name:</span>
            <span className="text-white font-bold">BaseTapper Token</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Symbol:</span>
            <span className="text-white font-bold">BTAP</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Network:</span>
            <span className="text-white font-bold">Base Sepolia</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Daily Limit:</span>
            <span className="text-white font-bold">10,000 BTAP</span>
          </div>
        </div>
      </div>

      {/* Add to Wallet */}
      <button
        onClick={() => {
          if (window.ethereum) {
            window.ethereum.request({
              method: 'wallet_watchAsset',
              params: {
                type: 'ERC20',
                options: {
                  address: TOKEN_ADDRESS,
                  symbol: 'BTAP',
                  decimals: 18,
                },
              },
            });
          }
        }}
        className="w-full p-3 bg-white/10 rounded-xl text-white font-bold hover:bg-white/20 transition"
      >
        ➕ Add BTAP to Wallet
      </button>
    </div>
  );
}
