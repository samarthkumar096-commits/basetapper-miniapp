'use client';

import { createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'BaseTapper',
      preference: 'smartWalletOnly',
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// Contract addresses (deploy and update these)
export const CONTRACTS = {
  BTAP_TOKEN: '0x0000000000000000000000000000000000000000', // Update after deployment
  BASETAPPER_NFT: '0x0000000000000000000000000000000000000000', // Update after deployment
};

// Contract ABIs
export const BTAP_TOKEN_ABI = [
  'function recordGems(uint256 amount) external',
  'function claimDailyBonus() external',
  'function claimTokens(uint256 gemAmount) external',
  'function getPlayerStats(address player) external view returns (uint256 gems, uint256 level, uint256 xp, uint256 streak, uint256 rank)',
  'function getTopPlayers(uint256 count) external view returns (address[] memory)',
  'function balanceOf(address account) external view returns (uint256)',
  'function playerGems(address) external view returns (uint256)',
  'function playerLevel(address) external view returns (uint256)',
  'function dailyStreak(address) external view returns (uint256)',
] as const;

export const BASETAPPER_NFT_ABI = [
  'function mintNFT(uint8 tier) external returns (uint256)',
  'function upgradeNFT(uint256 tokenId) external',
  'function getPlayerBonuses(address player) external view returns (uint256 totalGemsBoost, uint256 totalEnergyBoost)',
  'function getPlayerNFTs(address player) external view returns (uint256[] memory)',
  'function tokenURI(uint256 tokenId) external view returns (string memory)',
  'function ownerOf(uint256 tokenId) external view returns (address)',
] as const;

// NFT Tier costs
export const NFT_COSTS = {
  BRONZE: 5000,
  SILVER: 15000,
  GOLD: 50000,
  DIAMOND: 150000,
  LEGENDARY: 500000,
};

// Game constants
export const GAME_CONFIG = {
  GEMS_TO_TOKEN_RATE: 1000,
  ENERGY_REGEN_RATE: 1, // per second
  MAX_ENERGY: 1000,
  BASE_GEMS_PER_TAP: 1,
  XP_PER_TAP: 1,
  LEVEL_UP_XP_MULTIPLIER: 100,
};
