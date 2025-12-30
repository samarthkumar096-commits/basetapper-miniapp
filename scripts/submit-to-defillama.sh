#!/bin/bash

# DeFi Llama Submission Script
# This script automates the submission process

echo "🦙 DeFi Llama Submission Script"
echo "================================"
echo ""

# Check if contract addresses are updated
echo "📋 Step 1: Checking contract addresses..."
if grep -q "0x0000000000000000000000000000000000000000" defillama-adapter/index.js; then
    echo "❌ ERROR: Contract addresses not updated!"
    echo "Please update the addresses in defillama-adapter/index.js"
    echo ""
    echo "Required addresses:"
    echo "  - BTAP_TOKEN"
    echo "  - GAME_CONTRACT"
    echo "  - LIQUIDITY_POOL"
    echo "  - STAKING_CONTRACT"
    echo "  - TREASURY"
    echo "  - NFT contracts (5)"
    echo ""
    exit 1
fi
echo "✅ Contract addresses look good!"
echo ""

# Clone DeFi Llama adapters repo
echo "📥 Step 2: Cloning DeFi Llama adapters repo..."
if [ -d "adapters" ]; then
    echo "⚠️  Adapters repo already exists, pulling latest..."
    cd adapters
    git pull origin master
    cd ..
else
    git clone https://github.com/DefiLlama/adapters.git
fi
echo "✅ Repo ready!"
echo ""

# Create project folder
echo "📁 Step 3: Creating project folder..."
mkdir -p adapters/projects/basetapper
cp defillama-adapter/index.js adapters/projects/basetapper/
echo "✅ Files copied!"
echo ""

# Install dependencies
echo "📦 Step 4: Installing dependencies..."
cd adapters
npm install
echo "✅ Dependencies installed!"
echo ""

# Test adapter
echo "🧪 Step 5: Testing adapter..."
echo "Running: node test.js projects/basetapper/index.js"
echo ""
node test.js projects/basetapper/index.js

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Adapter test passed!"
    echo ""
    echo "📊 TVL Results:"
    echo "Check the output above for TVL breakdown"
    echo ""
else
    echo ""
    echo "❌ Adapter test failed!"
    echo "Please fix the errors and try again"
    echo ""
    exit 1
fi

# Commit changes
echo "💾 Step 6: Committing changes..."
git add projects/basetapper/
git commit -m "Add BaseTapper adapter - Tap-to-earn game on Base"
echo "✅ Changes committed!"
echo ""

# Push to fork
echo "📤 Step 7: Pushing to your fork..."
echo "⚠️  Make sure you've forked the repo first!"
echo "Fork at: https://github.com/DefiLlama/adapters/fork"
echo ""
read -p "Have you forked the repo? (y/n) " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    read -p "Enter your GitHub username: " username
    git remote add fork https://github.com/$username/adapters.git
    git push fork master
    echo "✅ Pushed to your fork!"
    echo ""
else
    echo "⚠️  Please fork the repo first, then run this script again"
    exit 1
fi

# Create PR
echo "🎯 Step 8: Creating Pull Request..."
echo ""
echo "Please create a PR manually at:"
echo "https://github.com/DefiLlama/adapters/compare"
echo ""
echo "PR Title: Add BaseTapper adapter"
echo ""
echo "PR Description:"
echo "---"
cat << 'EOF'
## BaseTapper - Tap-to-Earn Game on Base

**Category:** Gaming, GameFi  
**Chain:** Base  
**Token:** BTAP  

### Description
BaseTapper is a tap-to-earn game with real cryptocurrency rewards on Base blockchain. Players earn BTAP tokens by tapping, completing tasks, and referring friends.

### Contracts
- Token: [Add address]
- Game: [Add address]
- Liquidity Pool: [Add address]

### Links
- Website: https://ni-sage.vercel.app
- GitHub: https://github.com/samarthkumar096-commits/basetapper-miniapp
- Twitter: @BaseTapper
- Telegram: t.me/basetapper

### TVL Calculation
Tracks BTAP tokens locked in:
- Game contract (player rewards)
- Uniswap V3 pool (liquidity)
- Staking contract
- Treasury reserves

Token prices from Uniswap V3 TWAP and CoinGecko.

### Testing
```bash
node test.js projects/basetapper/index.js
```

Adapter tested and working correctly.
EOF
echo "---"
echo ""

echo "✅ All done!"
echo ""
echo "📋 Next Steps:"
echo "1. Create PR at the link above"
echo "2. Copy the PR description provided"
echo "3. Wait for review (typically 3-7 days)"
echo "4. Respond to any feedback"
echo "5. After merge, announce on social media!"
echo ""
echo "🎉 Good luck with your submission!"
