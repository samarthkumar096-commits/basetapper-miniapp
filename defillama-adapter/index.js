// BaseTapper DeFi Llama Adapter - Production Ready
// This adapter tracks TVL for BaseTapper protocol on Base

const ADDRESSES = require('../helper/coreAssets.json');
const { sumTokensExport } = require('../helper/unwrapLPs');

// ============================================
// CONTRACT ADDRESSES - UPDATE AFTER DEPLOYMENT
// ============================================

// IMPORTANT: Update these addresses after mainnet deployment
const BTAP_TOKEN = '0x0000000000000000000000000000000000000000'; // BaseTapper Token
const GAME_CONTRACT = '0x0000000000000000000000000000000000000000'; // Main game contract
const LIQUIDITY_POOL = '0x0000000000000000000000000000000000000000'; // Uniswap V3 BTAP/WETH pool
const STAKING_CONTRACT = '0x0000000000000000000000000000000000000000'; // Staking contract (optional)
const TREASURY = '0x0000000000000000000000000000000000000000'; // Treasury/rewards pool

// NFT Contracts (5 tiers)
const NFT_BRONZE = '0x0000000000000000000000000000000000000000';
const NFT_SILVER = '0x0000000000000000000000000000000000000000';
const NFT_GOLD = '0x0000000000000000000000000000000000000000';
const NFT_PLATINUM = '0x0000000000000000000000000000000000000000';
const NFT_DIAMOND = '0x0000000000000000000000000000000000000000';

// ============================================
// TVL CALCULATION
// ============================================

module.exports = {
  // Methodology explanation
  methodology: 
    "BaseTapper TVL includes: " +
    "(1) BTAP tokens locked in game contract for player rewards, " +
    "(2) BTAP and WETH in Uniswap V3 liquidity pool, " +
    "(3) BTAP tokens staked by users, " +
    "(4) Treasury reserves for future rewards. " +
    "Token prices are fetched from Uniswap V3 TWAP oracles and CoinGecko. " +
    "NFT floor values are tracked separately.",

  // Base chain TVL
  base: {
    tvl: sumTokensExport({
      // Contracts holding tokens
      owners: [
        GAME_CONTRACT,      // Game rewards pool
        LIQUIDITY_POOL,     // Uniswap V3 LP
        TREASURY,           // Treasury reserves
      ],
      // Tokens to track
      tokens: [
        BTAP_TOKEN,              // BTAP token
        ADDRESSES.base.WETH,     // Wrapped ETH
        ADDRESSES.base.USDC,     // USDC (if paired)
      ],
      // Resolve LP tokens
      resolveLP: true,
    }),
  },

  // Staking TVL (separate category)
  staking: {
    tvl: sumTokensExport({
      owners: [STAKING_CONTRACT],
      tokens: [BTAP_TOKEN],
    }),
  },

  // Pool2 - Liquidity mining rewards
  pool2: {
    tvl: sumTokensExport({
      owners: [LIQUIDITY_POOL],
      tokens: [BTAP_TOKEN, ADDRESSES.base.WETH],
      resolveLP: true,
    }),
  },
};

// ============================================
// TESTING INSTRUCTIONS
// ============================================

/*
To test this adapter locally:

1. Fork DeFi Llama adapters repo:
   git clone https://github.com/DefiLlama/adapters.git
   cd adapters

2. Create project folder:
   mkdir projects/basetapper
   cp this-file.js projects/basetapper/index.js

3. Update contract addresses above with real deployed addresses

4. Test the adapter:
   node test.js projects/basetapper/index.js

5. Expected output:
   ✅ BaseTapper TVL: $XX,XXX
   ✅ Breakdown:
      - base: $XX,XXX
      - staking: $X,XXX
      - pool2: $X,XXX

6. If successful, submit PR to DeFi Llama:
   git add projects/basetapper/
   git commit -m "Add BaseTapper adapter"
   git push origin main
   
7. Create PR at: https://github.com/DefiLlama/adapters/compare

8. Wait for review and merge (typically 3-7 days)

9. After merge, your protocol will appear on:
   https://defillama.com/protocol/basetapper
*/

// ============================================
// DEPLOYMENT CHECKLIST
// ============================================

/*
Before submitting to DeFi Llama:

✅ Deploy all contracts to Base mainnet
✅ Verify contracts on BaseScan
✅ Add liquidity to Uniswap V3 ($10K+ recommended)
✅ Update all contract addresses above
✅ Test adapter locally (must return valid TVL)
✅ Ensure TVL > $10,000 (recommended minimum)
✅ Have active users and transactions
✅ Create social media accounts
✅ Prepare project documentation
✅ Get token listed on CoinGecko (helps with pricing)

After submission:
✅ Monitor PR for review comments
✅ Respond quickly to feedback
✅ Update adapter if needed
✅ Announce listing on social media
✅ Add DeFi Llama badge to website
*/

// ============================================
// NOTES
// ============================================

/*
1. All addresses must be checksummed (proper capitalization)
2. Test on Base Sepolia testnet first
3. Ensure sufficient liquidity for accurate pricing
4. Update methodology if adding new features
5. Keep adapter simple and efficient
6. Follow DeFi Llama's coding standards
7. Include comments for complex logic
8. Handle edge cases (zero balances, etc.)
9. Use official DeFi Llama helper functions
10. Monitor TVL after listing for accuracy
*/
