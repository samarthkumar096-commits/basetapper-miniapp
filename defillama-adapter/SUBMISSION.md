# 🦙 DeFi Llama Submission - BaseTapper

## Project Information

**Name:** BaseTapper  
**Category:** Gaming, GameFi  
**Chain:** Base  
**Token:** BTAP (BaseTapper Token)  
**Website:** https://ni-sage.vercel.app  
**Twitter:** https://twitter.com/basetapper  
**Telegram:** https://t.me/basetapper  

## Description

BaseTapper is a tap-to-earn game built on Base blockchain where players earn real BTAP cryptocurrency rewards. The game features:

- Real ERC-20 token rewards (BTAP)
- 10-tier progression system
- Daily tasks and achievements
- NFT collectibles (5 tiers)
- Referral rewards system
- Built on Base for low fees (~$0.01/tx)

## TVL Methodology

The adapter tracks Total Value Locked across:

1. **Game Contract** - BTAP tokens reserved for player rewards
2. **Liquidity Pool** - BTAP/WETH pair on Uniswap V3
3. **Staking Contract** - Staked BTAP tokens (if applicable)
4. **NFT Floor Value** - Estimated value of NFT collections

Token prices are fetched from Uniswap V3 pools and CoinGecko.

## Smart Contracts

### Base Mainnet (To be deployed):
- **BTAP Token:** `0x...` (Update after deployment)
- **Game Contract:** `0x...` (Update after deployment)
- **Liquidity Pool:** `0x...` (Uniswap V3)
- **NFT Contracts:** `0x...` (5 collections)

### Base Sepolia Testnet (Current):
- Testing phase
- Contracts being audited
- Mainnet deployment pending

## Tokenomics

**Total Supply:** 1,000,000 BTAP

**Distribution:**
- 40% Game Rewards (400,000 BTAP)
- 30% Liquidity Pool (300,000 BTAP)
- 20% Team & Development (200,000 BTAP)
- 10% Marketing & Airdrops (100,000 BTAP)

## Audit Status

- OpenZeppelin standard contracts used
- Internal security review completed
- External audit: Pending
- Bug bounty program: Planned

## Social Links

- **Website:** https://ni-sage.vercel.app
- **GitHub:** https://github.com/samarthkumar096-commits/basetapper-miniapp
- **Twitter:** @BaseTapper (to be created)
- **Telegram:** t.me/basetapper (to be created)
- **Discord:** discord.gg/basetapper (to be created)
- **Documentation:** https://github.com/samarthkumar096-commits/basetapper-miniapp/blob/main/README.md

## Adapter Code

See: `/defillama-adapter/index.js`

The adapter uses DeFi Llama's SDK to:
1. Query BTAP token balances in tracked contracts
2. Fetch token prices from Uniswap/CoinGecko
3. Calculate total USD value
4. Return TVL breakdown by component

## Testing

```bash
# Clone DeFi Llama adapters repo
git clone https://github.com/DefiLlama/adapters.git
cd adapters

# Copy our adapter
mkdir projects/basetapper
cp /path/to/defillama-adapter/index.js projects/basetapper/

# Test locally
node test.js projects/basetapper/index.js
```

Expected output:
```
BaseTapper TVL: $XX,XXX
- Game Contract: $X,XXX
- Liquidity Pool: $X,XXX
- Staking: $X,XXX
```

## Roadmap

**Q1 2025:**
- ✅ Smart contracts developed
- ✅ Frontend deployed
- ✅ Testnet launch
- 🔄 Community building
- 🔄 Mainnet deployment

**Q2 2025:**
- DeFi Llama listing
- CoinGecko listing
- CoinMarketCap listing
- Exchange listings (DEX)
- 10,000+ users target

**Q3 2025:**
- CEX listings
- Mobile apps (iOS/Android)
- Partnerships
- 100,000+ users target

## Contact

For questions or updates:
- **GitHub Issues:** https://github.com/samarthkumar096-commits/basetapper-miniapp/issues
- **Email:** support@basetapper.io (to be setup)
- **Telegram:** @BaseTapperSupport (to be created)

## Notes

- Currently on testnet (Base Sepolia)
- Mainnet deployment pending liquidity
- Will update contract addresses after mainnet launch
- Adapter tested and ready for integration

---

**Submitted by:** BaseTapper Team  
**Date:** December 2024  
**Status:** Pending Mainnet Launch
