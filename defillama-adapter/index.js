// BaseTapper DeFi Llama Adapter
// Tracks TVL (Total Value Locked) in BaseTapper protocol

const ADDRESSES = require('../helper/coreAssets.json');
const { sumTokensExport } = require('../helper/unwrapLPs');

// Contract addresses on Base
const BTAP_TOKEN = '0x...'; // Update after deployment
const GAME_CONTRACT = '0x...'; // Update after deployment
const LIQUIDITY_POOL = '0x...'; // Uniswap V3 pool address
const STAKING_CONTRACT = '0x...'; // If you add staking

// NFT contract addresses
const NFT_CONTRACTS = [
  '0x...', // Bronze NFT
  '0x...', // Silver NFT
  '0x...', // Gold NFT
  '0x...', // Platinum NFT
  '0x...', // Diamond NFT
];

module.exports = {
  methodology: 
    "Counts TVL from BTAP tokens locked in game contracts, liquidity pools, and staking. " +
    "Includes NFT floor values. Token prices fetched from Uniswap/CoinGecko.",
  
  base: {
    tvl: sumTokensExport({
      owners: [
        GAME_CONTRACT,      // Tokens in game contract
        LIQUIDITY_POOL,     // Tokens in Uniswap pool
        STAKING_CONTRACT,   // Tokens staked (if applicable)
      ],
      tokens: [
        BTAP_TOKEN,         // BTAP token
        ADDRESSES.base.WETH, // Wrapped ETH in LP
        ADDRESSES.base.USDC, // USDC in LP (if paired)
      ],
    }),
  },
  
  // Optional: Track staking separately
  staking: {
    tvl: sumTokensExport({
      owners: [STAKING_CONTRACT],
      tokens: [BTAP_TOKEN],
    }),
  },
  
  // Optional: Track pool2 (liquidity mining)
  pool2: {
    tvl: sumTokensExport({
      owners: [LIQUIDITY_POOL],
      tokens: [BTAP_TOKEN, ADDRESSES.base.WETH],
    }),
  },
};
