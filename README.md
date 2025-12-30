# 💎 BaseTapper - Full Web3 Tap-to-Earn Game

**The REAL Web3 Game on Base!** 🚀

Complete tap-to-earn game with **Smart Contracts**, **NFTs**, **$BTAP Token**, **On-chain Leaderboard**, and **Wallet Integration**.

---

## 🎮 **Features**

### **Game Mechanics**
- ✅ Tap to mine gems
- ✅ Level system with XP
- ✅ Combo multipliers (up to 5x)
- ✅ Energy regeneration
- ✅ Daily login bonuses
- ✅ Achievement system
- ✅ Upgrade shop

### **Web3 Integration**
- ✅ **$BTAP ERC-20 Token** - Convert gems to real tokens
- ✅ **NFT System** - 5 tiers with boosts (Bronze → Legendary)
- ✅ **On-chain Leaderboard** - Top 100 players
- ✅ **Smart Wallet** - Coinbase Wallet integration
- ✅ **On-chain Stats** - All progress stored on Base
- ✅ **Daily Claims** - Claim rewards on-chain
- ✅ **Token Withdrawals** - 1000 gems = 1 BTAP

### **NFT Tiers & Boosts**
| Tier | Cost | Gems Boost | Energy Boost |
|------|------|------------|--------------|
| 🥉 Bronze | 5,000 | +5/tap | +100 max |
| 🥈 Silver | 15,000 | +10/tap | +250 max |
| 🥇 Gold | 50,000 | +20/tap | +500 max |
| 💎 Diamond | 150,000 | +50/tap | +1000 max |
| 👑 Legendary | 500,000 | +100/tap | +2500 max |

---

## 🚀 **Quick Start**

### **1. Deploy to Vercel**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samarthkumar096-commits/basetapper-miniapp)

### **2. Install Dependencies**

```bash
npm install
```

### **3. Setup Environment**

```bash
cp .env.example .env
```

Edit `.env` and add:
- Your private key (for deployment)
- Basescan API key
- WalletConnect project ID

### **4. Compile Smart Contracts**

```bash
npm run compile
```

### **5. Deploy Contracts to Base Sepolia (Testnet)**

```bash
npm run deploy:testnet
```

### **6. Update Contract Addresses**

After deployment, update `lib/web3-config.ts` with your contract addresses.

### **7. Run Development Server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 **Smart Contracts**

### **BTAPToken.sol**
- ERC-20 token with game mechanics
- On-chain gem tracking
- Daily bonus system
- Level progression
- Leaderboard management
- Token claiming (1000 gems = 1 BTAP)

### **BaseTapperNFT.sol**
- ERC-721 NFT collection
- 5 tier system with upgrades
- Boosts for gems and energy
- IPFS metadata
- Stackable bonuses

---

## 🛠️ **Tech Stack**

### **Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Wagmi v2
- Viem
- Coinbase OnchainKit

### **Smart Contracts**
- Solidity 0.8.20
- Hardhat
- OpenZeppelin Contracts
- Base (Ethereum L2)

### **Web3**
- Coinbase Smart Wallet
- Base Sepolia (testnet)
- Base Mainnet (production)
- IPFS (NFT metadata)

---

## 📝 **Deployment Guide**

### **Testnet Deployment (Base Sepolia)**

1. Get Base Sepolia ETH from [faucet](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)

2. Deploy contracts:
```bash
npm run deploy:testnet
```

3. Verify on Basescan:
```bash
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS>
```

### **Mainnet Deployment (Base)**

1. Fund your wallet with ETH on Base

2. Deploy contracts:
```bash
npm run deploy
```

3. Update production config

---

## 🎯 **Game Economics**

### **Token Economics**
- **Total Supply**: 1,000,000 BTAP
- **Conversion Rate**: 1000 gems = 1 BTAP
- **Daily Claim Limit**: 100 BTAP per player
- **Reward Pool**: Held in contract

### **Earning Mechanics**
- **Base Tap**: 1 gem
- **Level Bonus**: +1 gem per tap per level
- **NFT Boost**: +5 to +100 gems per tap
- **Combo Multiplier**: Up to 5x
- **Daily Bonus**: 100 + (level × 10) + (streak × 5) gems

---

## 🏆 **Leaderboard**

- Top 100 players tracked on-chain
- Real-time ranking updates
- Rewards for top players
- Transparent and verifiable

---

## 🔐 **Security**

- ✅ OpenZeppelin contracts
- ✅ ReentrancyGuard protection
- ✅ Access control (Ownable)
- ✅ Rate limiting on claims
- ✅ Audited patterns

---

## 📊 **Contract Addresses**

### **Base Sepolia (Testnet)**
- BTAP Token: `TBD`
- BaseTapper NFT: `TBD`

### **Base Mainnet**
- BTAP Token: `TBD`
- BaseTapper NFT: `TBD`

---

## 🎨 **NFT Metadata**

NFT metadata stored on IPFS with:
- Tier information
- Boost stats
- Rarity attributes
- High-quality artwork
- Animation URLs

---

## 🤝 **Contributing**

Contributions welcome! Please:
1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

---

## 📄 **License**

MIT License - Free to use and modify

---

## 🔗 **Links**

- **GitHub**: https://github.com/samarthkumar096-commits/basetapper-miniapp
- **Base Docs**: https://docs.base.org
- **Basescan**: https://basescan.org
- **OpenZeppelin**: https://openzeppelin.com/contracts

---

## 🆘 **Support**

- Open GitHub issue
- Join Base Discord
- Email: kumarsamarth982@gmail.com

---

## 🎯 **Roadmap**

### **Phase 1** ✅
- [x] Core game mechanics
- [x] Smart contracts
- [x] NFT system
- [x] Wallet integration

### **Phase 2** 🚧
- [ ] Multiplayer features
- [ ] Tournament system
- [ ] Staking rewards
- [ ] Governance token

### **Phase 3** 📋
- [ ] Mobile app
- [ ] Cross-chain bridge
- [ ] DAO governance
- [ ] Metaverse integration

---

## 💰 **Monetization**

- NFT sales (5% royalty)
- Premium upgrades
- Tournament entry fees
- Sponsored events
- Ad placements

---

## 📈 **Analytics**

Track your stats:
- Total taps
- Gems earned
- Tokens claimed
- NFTs owned
- Leaderboard rank
- Daily streak

---

Built with ❤️ on Base 🔵 | Powered by $BTAP 💎

**Star ⭐ this repo if you like it!**
