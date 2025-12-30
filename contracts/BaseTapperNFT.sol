// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BaseTapperNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    // NFT Tiers
    enum Tier { BRONZE, SILVER, GOLD, DIAMOND, LEGENDARY }
    
    struct NFTMetadata {
        Tier tier;
        uint256 gemsBoost;
        uint256 energyBoost;
        uint256 mintedAt;
        string imageURI;
    }
    
    mapping(uint256 => NFTMetadata) public nftMetadata;
    mapping(address => uint256[]) public playerNFTs;
    
    // Tier requirements (in gems)
    uint256 public constant BRONZE_COST = 5000;
    uint256 public constant SILVER_COST = 15000;
    uint256 public constant GOLD_COST = 50000;
    uint256 public constant DIAMOND_COST = 150000;
    uint256 public constant LEGENDARY_COST = 500000;
    
    // Base URIs for each tier
    string public bronzeURI = "ipfs://QmBronze/";
    string public silverURI = "ipfs://QmSilver/";
    string public goldURI = "ipfs://QmGold/";
    string public diamondURI = "ipfs://QmDiamond/";
    string public legendaryURI = "ipfs://QmLegendary/";
    
    event NFTMinted(address indexed player, uint256 tokenId, Tier tier);
    event NFTUpgraded(uint256 indexed tokenId, Tier newTier);
    
    constructor() ERC721("BaseTapper NFT", "BTNFT") Ownable(msg.sender) {}
    
    // Mint NFT based on tier
    function mintNFT(Tier tier) external returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _safeMint(msg.sender, newTokenId);
        
        // Set metadata based on tier
        (uint256 gemsBoost, uint256 energyBoost, string memory imageURI) = getTierBonuses(tier);
        
        nftMetadata[newTokenId] = NFTMetadata({
            tier: tier,
            gemsBoost: gemsBoost,
            energyBoost: energyBoost,
            mintedAt: block.timestamp,
            imageURI: imageURI
        });
        
        playerNFTs[msg.sender].push(newTokenId);
        
        emit NFTMinted(msg.sender, newTokenId, tier);
        return newTokenId;
    }
    
    // Get tier bonuses
    function getTierBonuses(Tier tier) internal view returns (uint256 gemsBoost, uint256 energyBoost, string memory imageURI) {
        if (tier == Tier.BRONZE) {
            return (5, 100, bronzeURI);
        } else if (tier == Tier.SILVER) {
            return (10, 250, silverURI);
        } else if (tier == Tier.GOLD) {
            return (20, 500, goldURI);
        } else if (tier == Tier.DIAMOND) {
            return (50, 1000, diamondURI);
        } else {
            return (100, 2500, legendaryURI);
        }
    }
    
    // Upgrade NFT to next tier
    function upgradeNFT(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not NFT owner");
        
        NFTMetadata storage metadata = nftMetadata[tokenId];
        require(metadata.tier != Tier.LEGENDARY, "Already max tier");
        
        Tier newTier = Tier(uint256(metadata.tier) + 1);
        (uint256 gemsBoost, uint256 energyBoost, string memory imageURI) = getTierBonuses(newTier);
        
        metadata.tier = newTier;
        metadata.gemsBoost = gemsBoost;
        metadata.energyBoost = energyBoost;
        metadata.imageURI = imageURI;
        
        emit NFTUpgraded(tokenId, newTier);
    }
    
    // Get player's total bonuses from all NFTs
    function getPlayerBonuses(address player) external view returns (uint256 totalGemsBoost, uint256 totalEnergyBoost) {
        uint256[] memory tokens = playerNFTs[player];
        
        for (uint256 i = 0; i < tokens.length; i++) {
            NFTMetadata memory metadata = nftMetadata[tokens[i]];
            totalGemsBoost += metadata.gemsBoost;
            totalEnergyBoost += metadata.energyBoost;
        }
        
        return (totalGemsBoost, totalEnergyBoost);
    }
    
    // Get player's NFTs
    function getPlayerNFTs(address player) external view returns (uint256[] memory) {
        return playerNFTs[player];
    }
    
    // Token URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        NFTMetadata memory metadata = nftMetadata[tokenId];
        return string(abi.encodePacked(metadata.imageURI, Strings.toString(tokenId), ".json"));
    }
    
    // Update base URIs
    function updateBaseURIs(
        string memory _bronzeURI,
        string memory _silverURI,
        string memory _goldURI,
        string memory _diamondURI,
        string memory _legendaryURI
    ) external onlyOwner {
        bronzeURI = _bronzeURI;
        silverURI = _silverURI;
        goldURI = _goldURI;
        diamondURI = _diamondURI;
        legendaryURI = _legendaryURI;
    }
}
