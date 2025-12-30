'use client';

import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { CONTRACTS, BTAP_TOKEN_ABI, BASETAPPER_NFT_ABI } from './web3-config';
import { useState, useEffect } from 'react';

export function useWeb3Game() {
  const { address, isConnected } = useAccount();
  const [localGems, setLocalGems] = useState(0);

  // Read player stats from contract
  const { data: playerStats, refetch: refetchStats } = useReadContract({
    address: CONTRACTS.BTAP_TOKEN as `0x${string}`,
    abi: BTAP_TOKEN_ABI,
    functionName: 'getPlayerStats',
    args: address ? [address] : undefined,
  });

  // Read BTAP balance
  const { data: btapBalance } = useReadContract({
    address: CONTRACTS.BTAP_TOKEN as `0x${string}`,
    abi: BTAP_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Read NFT bonuses
  const { data: nftBonuses } = useReadContract({
    address: CONTRACTS.BASETAPPER_NFT as `0x${string}`,
    abi: BASETAPPER_NFT_ABI,
    functionName: 'getPlayerBonuses',
    args: address ? [address] : undefined,
  });

  // Write contracts
  const { writeContract: recordGems, data: recordGemsHash } = useWriteContract();
  const { writeContract: claimDaily, data: claimDailyHash } = useWriteContract();
  const { writeContract: claimTokens, data: claimTokensHash } = useWriteContract();
  const { writeContract: mintNFT, data: mintNFTHash } = useWriteContract();

  // Wait for transactions
  const { isLoading: isRecordingGems } = useWaitForTransactionReceipt({ hash: recordGemsHash });
  const { isLoading: isClaimingDaily } = useWaitForTransactionReceipt({ hash: claimDailyHash });
  const { isLoading: isClaimingTokens } = useWaitForTransactionReceipt({ hash: claimTokensHash });
  const { isLoading: isMintingNFT } = useWaitForTransactionReceipt({ hash: mintNFTHash });

  // Sync local gems with contract periodically
  useEffect(() => {
    if (localGems > 0 && isConnected && address) {
      const interval = setInterval(() => {
        handleRecordGems(localGems);
        setLocalGems(0);
      }, 30000); // Sync every 30 seconds

      return () => clearInterval(interval);
    }
  }, [localGems, isConnected, address]);

  // Record gems on-chain
  const handleRecordGems = async (amount: number) => {
    if (!isConnected || !address) return;
    
    try {
      recordGems({
        address: CONTRACTS.BTAP_TOKEN as `0x${string}`,
        abi: BTAP_TOKEN_ABI,
        functionName: 'recordGems',
        args: [BigInt(amount)],
      });
    } catch (error) {
      console.error('Error recording gems:', error);
    }
  };

  // Claim daily bonus
  const handleClaimDaily = async () => {
    if (!isConnected || !address) return;
    
    try {
      claimDaily({
        address: CONTRACTS.BTAP_TOKEN as `0x${string}`,
        abi: BTAP_TOKEN_ABI,
        functionName: 'claimDailyBonus',
      });
    } catch (error) {
      console.error('Error claiming daily bonus:', error);
    }
  };

  // Claim BTAP tokens
  const handleClaimTokens = async (gemAmount: number) => {
    if (!isConnected || !address) return;
    
    try {
      claimTokens({
        address: CONTRACTS.BTAP_TOKEN as `0x${string}`,
        abi: BTAP_TOKEN_ABI,
        functionName: 'claimTokens',
        args: [BigInt(gemAmount)],
      });
    } catch (error) {
      console.error('Error claiming tokens:', error);
    }
  };

  // Mint NFT
  const handleMintNFT = async (tier: number) => {
    if (!isConnected || !address) return;
    
    try {
      mintNFT({
        address: CONTRACTS.BASETAPPER_NFT as `0x${string}`,
        abi: BASETAPPER_NFT_ABI,
        functionName: 'mintNFT',
        args: [tier],
      });
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return {
    // Account
    address,
    isConnected,
    
    // Stats
    playerStats: playerStats as [bigint, bigint, bigint, bigint, bigint] | undefined,
    btapBalance: btapBalance as bigint | undefined,
    nftBonuses: nftBonuses as [bigint, bigint] | undefined,
    
    // Actions
    recordGems: handleRecordGems,
    claimDaily: handleClaimDaily,
    claimTokens: handleClaimTokens,
    mintNFT: handleMintNFT,
    
    // Local state
    localGems,
    setLocalGems,
    
    // Loading states
    isRecordingGems,
    isClaimingDaily,
    isClaimingTokens,
    isMintingNFT,
    
    // Refetch
    refetchStats,
  };
}
