# 💎 BaseTapper - Tap-to-Earn Game on Base

**Tap. Earn. Win!**

BaseTapper is a fun and addictive tap-to-earn game built as a Base MINI app. Mine gems by tapping, earn $BTAP tokens, and compete on the leaderboard!

## 🚀 **ONE-CLICK DEPLOY TO VERCEL**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/samarthkumar096-commits/basetapper-miniapp)

**Click the button above to deploy instantly!** ⬆️

---

## 🎮 Features

- **Tap to Mine**: Tap the gem to earn rewards
- **Daily Bonus**: Login daily to get 100 free gems
- **Energy System**: Energy regenerates over time (1 per second)
- **Leaderboard**: Compete with other players
- **Friend Invites**: Invite friends and earn 500 gems bonus
- **$BTAP Token**: Earn and withdraw real tokens
- **Beautiful UI**: Gradient animations and floating effects
- **Local Storage**: Your progress is saved automatically

## 🎯 Game Mechanics

- **Gems per Tap**: 1 gem
- **Max Energy**: 1000
- **Energy Regen**: 1 per second
- **Daily Bonus**: 100 gems
- **Friend Invite Bonus**: 500 gems

---

## 📦 Manual Deployment (Alternative)

### Prerequisites
- Node.js 18+ installed
- Vercel account (free)
- Base app account

### Installation

```bash
# Clone the repository
git clone https://github.com/samarthkumar096-commits/basetapper-miniapp.git
cd basetapper-miniapp

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Deploy to Vercel Manually

1. Push code to GitHub (already done!)
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import this repository: `samarthkumar096-commits/basetapper-miniapp`
4. Click "Deploy"
5. Wait 2-3 minutes ✅

---

## 🔵 Configure as Base MINI App

### Step 1: Get Your Vercel URL
After deployment, you'll get a URL like: `https://basetapper-miniapp.vercel.app`

### Step 2: Generate Base Credentials

1. Visit [base.dev/build](https://base.dev/build)
2. Sign in with your Farcaster/Base account
3. Enter your Vercel URL
4. Generate `accountAssociation` credentials
5. Copy the generated values

### Step 3: Update Config

Update `minikit.config.ts` with your credentials:

```typescript
export default {
  name: "BaseTapper",
  description: "Tap to earn gems and win $BTAP tokens!",
  icon: "https://your-vercel-url.vercel.app/icon.png",
  coverImage: "https://your-vercel-url.vercel.app/cover.png",
  externalLink: "https://your-vercel-url.vercel.app",
  accountAssociation: {
    header: "0x...", // Paste from base.dev/build
    payload: "0x...", // Paste from base.dev/build
    signature: "0x..." // Paste from base.dev/build
  }
}
```

### Step 4: Push & Redeploy

```bash
git add minikit.config.ts
git commit -m "Add Base credentials"
git push origin main
```

Vercel will auto-redeploy! ✅

### Step 5: Publish on Base

1. Preview at [base.dev/preview](https://base.dev/preview)
2. Enter your Vercel URL
3. Test the app
4. Post in Base app to publish
5. **GO VIRAL!** 🚀

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Base (Ethereum L2)
- **Wallet**: Coinbase OnchainKit
- **Deployment**: Vercel
- **Storage**: LocalStorage (client-side)

## 💰 Monetization Features

- ✅ In-app purchase ready
- ✅ Token integration prepared
- ✅ Ad placement slots
- ✅ Premium features architecture
- ✅ Referral system built-in

## 📱 Screenshots

Coming soon!

## 🎨 Customization

### Change Colors
Edit `app/page.tsx` - look for gradient classes:
- `from-blue-900 via-purple-900 to-black` (background)
- `from-emerald-400 to-blue-500` (gem button)

### Change Rewards
Edit constants in `app/page.tsx`:
- `gemsPerTap`: Gems earned per tap
- `maxEnergy`: Maximum energy capacity
- Daily bonus: Line ~30
- Friend bonus: Line ~120

### Add Features
- Leaderboard: Connect to database
- Multiplayer: Add WebSocket
- NFTs: Integrate OnchainKit
- Payments: Add Stripe/Razorpay

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests
- Share feedback

## 📄 License

MIT License - feel free to use for your own projects!

## 🔗 Important Links

- **GitHub Repo**: https://github.com/samarthkumar096-commits/basetapper-miniapp
- **Base Docs**: https://docs.base.org/mini-apps
- **Vercel**: https://vercel.com
- **Base Build**: https://base.dev/build
- **Base Preview**: https://base.dev/preview

## 🆘 Need Help?

- Check Base docs: https://docs.base.org
- Join Base Discord
- Open GitHub issue
- Contact: kumarsamarth982@gmail.com

---

## 🎯 Quick Start Checklist

- [ ] Click "Deploy to Vercel" button above
- [ ] Wait for deployment (2-3 min)
- [ ] Copy your Vercel URL
- [ ] Generate credentials at base.dev/build
- [ ] Update minikit.config.ts
- [ ] Push to GitHub
- [ ] Preview at base.dev/preview
- [ ] Publish on Base app
- [ ] Share with friends!
- [ ] **PROFIT!** 💰

---

Built with ❤️ on Base 🔵 | Powered by $BTAP 💎

**Star ⭐ this repo if you like it!**
