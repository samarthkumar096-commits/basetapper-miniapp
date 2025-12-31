# Fleek Deployment Guide for BaseTapper

## 🚀 Quick Deploy to Fleek

### Step 1: Sign Up
1. Go to: https://app.fleek.co/signup
2. Click "Sign up with GitHub"
3. Authorize Fleek

### Step 2: Create New Site
1. Click "Add new site"
2. Select "Deploy with GitHub"
3. Choose repository: basetapper-miniapp
4. Click "Continue"

### Step 3: Configure Build Settings

```
Framework: Next.js
Build Command: npm run build
Publish Directory: out
Docker Image: node:18
```

### Step 4: Deploy
1. Click "Deploy site"
2. Wait 2-3 minutes
3. Your site is live!

## 🌐 Your URLs

After deployment, you'll get:

1. **Fleek URL**: https://basetapper.on.fleek.co
2. **IPFS URL**: https://ipfs.fleek.co/ipfs/Qm...
3. **IPFS Gateway**: ipfs://Qm...

## ✅ Features

- ✅ 100% FREE forever
- ✅ Decentralized IPFS hosting
- ✅ Auto-deploy from GitHub
- ✅ Custom domains FREE
- ✅ SSL certificates FREE
- ✅ ENS domain support
- ✅ Global CDN
- ✅ Perfect for Web3 apps

## 🔧 Build Configuration

The project is already optimized for Fleek with:
- Static export enabled
- Image optimization configured
- Trailing slashes for better routing
- SWC minification

## 📝 Custom Domain (Optional)

1. Go to site settings
2. Click "Add Custom Domain"
3. Enter your domain
4. Update DNS records:
   - Type: CNAME
   - Name: @
   - Value: [provided by Fleek]
5. Wait for DNS propagation (5-30 min)
6. SSL auto-enabled!

## 🎯 ENS Domain (Optional)

1. Own an ENS domain (e.g., basetapper.eth)
2. Go to Fleek site settings
3. Click "Add ENS Domain"
4. Connect wallet
5. Set content hash
6. Done! Access via basetapper.eth

## 🔄 Auto-Deploy

Every push to main branch triggers:
1. Automatic build
2. Deployment to IPFS
3. CDN update
4. New IPFS hash
5. URL stays same!

## 📊 Monitoring

Check deployment status:
- Build logs
- IPFS hash
- Deployment history
- Traffic analytics
- Bandwidth usage

## 🆘 Troubleshooting

### Build Fails?
- Check build logs
- Verify Node.js version (18.x)
- Check dependencies
- Review error messages

### Site Not Loading?
- Wait 2-3 minutes after deploy
- Clear browser cache
- Try IPFS gateway URL
- Check Fleek status page

### Images Not Showing?
- Already configured with `unoptimized: true`
- Use relative paths
- Check image formats (jpg, png, svg)

## 🎉 Success!

Your BaseTapper app is now:
- ✅ Deployed on IPFS
- ✅ Accessible via Fleek CDN
- ✅ Auto-deploying from GitHub
- ✅ 100% decentralized
- ✅ Perfect for Web3!

## 🔗 Useful Links

- Fleek Dashboard: https://app.fleek.co
- Fleek Docs: https://docs.fleek.co
- IPFS Docs: https://docs.ipfs.tech
- Support: https://discord.gg/fleek

## 💡 Pro Tips

1. Use Fleek URL for best performance
2. IPFS URL for decentralization
3. Add custom domain for branding
4. Enable ENS for Web3 identity
5. Monitor analytics regularly
6. Keep dependencies updated
7. Test before pushing to main

---

**Built with ❤️ for Web3**
**Deployed on Fleek 🚀**
