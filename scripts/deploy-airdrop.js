const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying BaseTapper Airdrop Contract...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📍 Deploying from:", deployer.address);
  console.log("💰 Balance:", hre.ethers.utils.formatEther(await deployer.getBalance()), "ETH\n");

  // Deploy BTAP Token first (if not already deployed)
  console.log("📦 Deploying BTAP Token...");
  const BaseTapperToken = await hre.ethers.getContractFactory("BaseTapperToken");
  const btapToken = await BaseTapperToken.deploy();
  await btapToken.deployed();
  console.log("✅ BTAP Token deployed to:", btapToken.address);

  // Deploy Airdrop Contract
  console.log("\n📦 Deploying Airdrop Contract...");
  const BaseTapperAirdrop = await hre.ethers.getContractFactory("BaseTapperAirdrop");
  const airdrop = await BaseTapperAirdrop.deploy(btapToken.address);
  await airdrop.deployed();
  console.log("✅ Airdrop Contract deployed to:", airdrop.address);

  // Transfer tokens to airdrop contract
  const airdropSupply = hre.ethers.utils.parseEther("10000000"); // 10M BTAP for airdrop
  console.log("\n💸 Transferring 10M BTAP to airdrop contract...");
  const transferTx = await btapToken.transfer(airdrop.address, airdropSupply);
  await transferTx.wait();
  console.log("✅ Transferred 10,000,000 BTAP to airdrop contract");

  // Verify airdrop balance
  const airdropBalance = await btapToken.balanceOf(airdrop.address);
  console.log("💰 Airdrop contract balance:", hre.ethers.utils.formatEther(airdropBalance), "BTAP");

  // Get airdrop stats
  const stats = await airdrop.getStats();
  console.log("\n📊 Airdrop Configuration:");
  console.log("   Airdrop Amount:", hre.ethers.utils.formatEther(stats._airdropAmount), "BTAP");
  console.log("   Referral Bonus:", hre.ethers.utils.formatEther(stats._referralBonus), "BTAP");
  console.log("   Active:", stats._active);

  console.log("\n✅ Deployment Complete!");
  console.log("\n📋 Contract Addresses:");
  console.log("   BTAP Token:", btapToken.address);
  console.log("   Airdrop Contract:", airdrop.address);

  console.log("\n🔗 Verify on Basescan:");
  console.log(`   Token: https://sepolia.basescan.org/address/${btapToken.address}`);
  console.log(`   Airdrop: https://sepolia.basescan.org/address/${airdrop.address}`);

  console.log("\n📝 Save these addresses for frontend integration!");

  // Save addresses to file
  const fs = require('fs');
  const addresses = {
    network: hre.network.name,
    btapToken: btapToken.address,
    airdropContract: airdrop.address,
    deployer: deployer.address,
    timestamp: new Date().toISOString()
  };
  
  fs.writeFileSync(
    'airdrop-addresses.json',
    JSON.stringify(addresses, null, 2)
  );
  console.log("\n💾 Addresses saved to airdrop-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
