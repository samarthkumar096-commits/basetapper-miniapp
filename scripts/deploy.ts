const hre = require("hardhat");

async function main() {
  console.log("Deploying BaseTapper contracts to Base...");

  // Deploy BTAP Token
  console.log("\n1. Deploying BTAP Token...");
  const BTAPToken = await hre.ethers.getContractFactory("BTAPToken");
  const btapToken = await BTAPToken.deploy();
  await btapToken.waitForDeployment();
  const btapAddress = await btapToken.getAddress();
  console.log("✅ BTAP Token deployed to:", btapAddress);

  // Deploy BaseTapper NFT
  console.log("\n2. Deploying BaseTapper NFT...");
  const BaseTapperNFT = await hre.ethers.getContractFactory("BaseTapperNFT");
  const nft = await BaseTapperNFT.deploy();
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log("✅ BaseTapper NFT deployed to:", nftAddress);

  // Verify contracts
  console.log("\n3. Waiting for block confirmations...");
  await btapToken.deploymentTransaction().wait(5);
  await nft.deploymentTransaction().wait(5);

  console.log("\n4. Verifying contracts on Basescan...");
  try {
    await hre.run("verify:verify", {
      address: btapAddress,
      constructorArguments: [],
    });
    console.log("✅ BTAP Token verified");
  } catch (error) {
    console.log("⚠️ BTAP Token verification failed:", error.message);
  }

  try {
    await hre.run("verify:verify", {
      address: nftAddress,
      constructorArguments: [],
    });
    console.log("✅ BaseTapper NFT verified");
  } catch (error) {
    console.log("⚠️ NFT verification failed:", error.message);
  }

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 DEPLOYMENT COMPLETE!");
  console.log("=".repeat(60));
  console.log("\n📝 Contract Addresses:");
  console.log("   BTAP Token:", btapAddress);
  console.log("   BaseTapper NFT:", nftAddress);
  console.log("\n🔗 Update these addresses in:");
  console.log("   lib/web3-config.ts");
  console.log("\n📊 View on Basescan:");
  console.log("   BTAP:", `https://basescan.org/address/${btapAddress}`);
  console.log("   NFT:", `https://basescan.org/address/${nftAddress}`);
  console.log("=".repeat(60) + "\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
