import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying BaseTapper Token & Faucet to Base Sepolia...\n");

  // Get deployer
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  // Deploy BTAP Token
  console.log("📦 Deploying BaseTapperToken...");
  const BaseTapperToken = await ethers.getContractFactory("BaseTapperToken");
  const token = await BaseTapperToken.deploy();
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("✅ BaseTapperToken deployed to:", tokenAddress);

  // Deploy Faucet
  console.log("\n📦 Deploying TokenFaucet...");
  const TokenFaucet = await ethers.getContractFactory("TokenFaucet");
  const faucet = await TokenFaucet.deploy(tokenAddress);
  await faucet.waitForDeployment();
  const faucetAddress = await faucet.getAddress();
  console.log("✅ TokenFaucet deployed to:", faucetAddress);

  // Transfer tokens to faucet
  console.log("\n💸 Transferring tokens to faucet...");
  const faucetSupply = ethers.parseEther("100000"); // 100K BTAP for faucet
  await token.transfer(faucetAddress, faucetSupply);
  console.log("✅ Transferred 100,000 BTAP to faucet");

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("=".repeat(60));
  console.log("\n📋 Contract Addresses:");
  console.log("   BTAP Token:", tokenAddress);
  console.log("   Faucet:", faucetAddress);
  console.log("\n🔗 Verify on BaseScan:");
  console.log("   Token:", `https://sepolia.basescan.org/address/${tokenAddress}`);
  console.log("   Faucet:", `https://sepolia.basescan.org/address/${faucetAddress}`);
  console.log("\n📝 Update these addresses in:");
  console.log("   - components/RealCryptoIntegration.tsx");
  console.log("   - .env.local");
  console.log("\n💡 Next Steps:");
  console.log("   1. Verify contracts: npx hardhat verify --network baseSepolia <address>");
  console.log("   2. Update frontend with contract addresses");
  console.log("   3. Test faucet claim functionality");
  console.log("   4. Add liquidity on Uniswap (for mainnet)");
  console.log("\n" + "=".repeat(60));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
