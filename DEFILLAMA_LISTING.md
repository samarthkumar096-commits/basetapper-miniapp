# 🦙 **DeFi Llama Listing Guide**

## 📋 **Submission Checklist:**

### **✅ Prerequisites:**
- [ ] Smart contracts deployed on Base
- [ ] Liquidity pool created (Uniswap V3)
- [ ] TVL > $10,000 (recommended)
- [ ] Token listed on CoinGecko/CMC
- [ ] Active community (Twitter/Telegram)
- [ ] Documentation ready

---

## 🚀 **Step-by-Step Submission:**

### **Step 1: Fork DeFi Llama Adapters Repo**
```bash
# Go to: https://github.com/DefiLlama/adapters
# Click "Fork" button (top-right)
# Clone your fork:
git clone https://github.com/YOUR_USERNAME/adapters.git
cd adapters
npm install
```

### **Step 2: Create Project Folder**
```bash
# Create folder with your project name
mkdir projects/basetapper
cd projects/basetapper

# Copy our adapter
cp ../../defillama-adapter/index.js ./index.js
```

### **Step 3: Update Contract Addresses**
Edit `index.js` and update:
```javascript
const BTAP_TOKEN = '0xYourTokenAddress';
const GAME_CONTRACT = '0xYourGameContract';
const LIQUIDITY_POOL = '0xYourUniswapPool';
```

### **Step 4: Test Adapter Locally**
```bash
# From adapters root directory
node test.js projects/basetapper/index.js

# Should output:
# ✅ TVL: $X,XXX USD
# ✅ Breakdown by chain
# ✅ Token balances
```

### **Step 5: Submit Pull Request**
```bash
# Commit changes
git add projects/basetapper/
git commit -m "Add BaseTapper adapter"
git push origin main

# Go to GitHub and create PR:
# https://github.com/DefiLlama/adapters/compare
# Click "Create Pull Request"
```

### **Step 6: PR Description Template**
```markdown
## BaseTapper - Tap-to-Earn Game on Base

**Category:** Gaming, GameFi
**Chain:** Base
**Token:** BTAP

### Description:
BaseTapper is a tap-to-earn game with real cryptocurrency rewards. 
Players earn BTAP tokens by tapping, completing tasks, and referring friends.

### Contracts:
- Token: 0x...
- Game: 0x...
- Liquidity Pool: 0x...

### Links:
- Website: https://ni-sage.vercel.app
- Twitter: https://twitter.com/basetapper
- Telegram: https://t.me/basetapper
- Docs: https://github.com/samarthkumar096-commits/basetapper-miniapp

### TVL Calculation:
Tracks BTAP tokens locked in:
- Game contract (player rewards)
- Uniswap V3 pool (liquidity)
- Staking contract (if applicable)

Token prices from Uniswap/CoinGecko.
```

---

## 📊 **What Gets Tracked:**

### **TVL Components:**
```
1. Game Contract Balance
   - Tokens reserved for rewards
   - Player unclaimed tokens
   
2. Liquidity Pool
   - BTAP tokens in Uniswap
   - Paired tokens (ETH/USDC)
   
3. Staking (Optional)
   - Staked BTAP tokens
   - Locked tokens
```

### **Metrics Displayed:**
```
✅ Total Value Locked (TVL)
✅ 24h Change
✅ 7d Change
✅ Chain breakdown
✅ Token breakdown
✅ Historical charts
```

---

## 🎯 **Requirements for Approval:**

### **Technical:**
```
✅ Adapter works correctly
✅ TVL calculation accurate
✅ Contract addresses verified
✅ Token prices available
✅ No errors in test
```

### **Project:**
```
✅ Live on mainnet
✅ Real users/transactions
✅ TVL > $10K (recommended)
✅ Audited contracts (bonus)
✅ Active community
```

---

## ⏱️ **Timeline:**

```
Day 1: Submit PR
Day 2-3: Review by DeFi Llama team
Day 4-5: Merge (if approved)
Day 6: Live on DeFi Llama! 🎉

Total: ~1 week
```

---

## 💡 **Tips for Approval:**

### **Do's:**
```
✅ Test adapter thoroughly
✅ Use clear variable names
✅ Add methodology comment
✅ Include all contracts
✅ Verify addresses on BaseScan
✅ Respond to review comments quickly
```

### **Don'ts:**
```
❌ Submit before mainnet launch
❌ Fake TVL numbers
❌ Copy other adapters without changes
❌ Submit with errors
❌ Ignore review feedback
```

---

## 🔗 **After Listing:**

### **Your Project Will Show:**
```
✅ On DeFi Llama homepage
✅ In Base chain rankings
✅ In Gaming category
✅ TVL charts & analytics
✅ Token price tracking
```

### **Benefits:**
```
✅ Massive visibility
✅ Credibility boost
✅ Investor attention
✅ User trust
✅ Free marketing
✅ Analytics dashboard
```

---

## 📱 **Update Metadata:**

### **After Listing, Add:**

**Logo:**
```
Submit 200x200 PNG to:
Discord: #listings channel
Or: GitHub PR to /icons/
```

**Description:**
```
Update project info:
- Website URL
- Social links
- Category tags
- Token info
```

**Audit:**
```
If audited, add badge:
- Upload audit report
- Link in metadata
- Shows on listing
```

---

## 🎮 **Example Listings:**

### **Similar Projects:**
```
1. Axie Infinity - $2B TVL
2. Gala Games - $500M TVL
3. Illuvium - $100M TVL
4. Star Atlas - $50M TVL
```

### **Your Target:**
```
Month 1: $10K TVL
Month 3: $100K TVL
Month 6: $1M TVL
Year 1: $10M+ TVL
```

---

## 🚨 **Common Issues:**

### **Problem: Adapter Test Fails**
```
Solution:
- Check contract addresses
- Verify chain ID
- Test RPC connection
- Check token decimals
```

### **Problem: TVL Shows $0**
```
Solution:
- Ensure liquidity added
- Check token price feed
- Verify contract has balance
- Test on mainnet, not testnet
```

### **Problem: PR Rejected**
```
Solution:
- Read rejection reason
- Fix issues mentioned
- Re-test adapter
- Submit again
```

---

## 📞 **Support:**

### **DeFi Llama:**
```
Discord: https://discord.gg/defillama
Twitter: @DefiLlama
GitHub: github.com/DefiLlama/adapters
Docs: docs.llama.fi
```

### **Questions:**
```
1. Check existing adapters for examples
2. Ask in Discord #dev-chat
3. Read documentation
4. Test thoroughly before submitting
```

---

## 🎯 **Action Plan:**

### **Before Submission:**
```
1. Deploy to Base mainnet
2. Add liquidity ($1K+ recommended)
3. Get 100+ users
4. List on CoinGecko
5. Build community
```

### **During Submission:**
```
1. Fork repo
2. Create adapter
3. Test locally
4. Submit PR
5. Respond to reviews
```

### **After Approval:**
```
1. Announce on social media
2. Add DeFi Llama badge to website
3. Monitor TVL growth
4. Update adapter if needed
5. Engage with community
```

---

## 💰 **Expected Impact:**

### **Visibility:**
```
DeFi Llama gets:
- 5M+ monthly visitors
- 100K+ daily users
- Top crypto analytics site
- Trusted by investors
```

### **Your Benefits:**
```
✅ 10x more visibility
✅ Investor discovery
✅ User trust boost
✅ Free analytics
✅ Competitive rankings
✅ Media mentions
```

---

## 🚀 **Ready to Submit?**

### **Checklist:**
```
✅ Contracts deployed on Base mainnet
✅ Liquidity pool created
✅ TVL > $10K
✅ Adapter tested locally
✅ All addresses verified
✅ Community active
✅ Documentation ready
```

### **Next Steps:**
```
1. Deploy contracts (if not done)
2. Add liquidity
3. Test adapter
4. Submit PR
5. Wait for approval
6. Celebrate! 🎉
```

---

**DeFi Llama listing = MASSIVE credibility boost! 🦙🚀**
