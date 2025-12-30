// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BTAPToken is ERC20, Ownable, ReentrancyGuard {
    
    // Game state
    mapping(address => uint256) public playerGems;
    mapping(address => uint256) public playerLevel;
    mapping(address => uint256) public playerXP;
    mapping(address => uint256) public lastClaimTime;
    mapping(address => uint256) public dailyStreak;
    mapping(address => bool) public hasClaimedToday;
    
    // Leaderboard
    address[] public topPlayers;
    mapping(address => uint256) public leaderboardRank;
    
    // Game economics
    uint256 public constant GEMS_TO_TOKEN_RATE = 1000; // 1000 gems = 1 BTAP
    uint256 public constant DAILY_CLAIM_COOLDOWN = 1 days;
    uint256 public constant MAX_DAILY_CLAIM = 100 * 10**18; // 100 BTAP per day
    
    // Events
    event GemsEarned(address indexed player, uint256 amount);
    event TokensClaimed(address indexed player, uint256 gems, uint256 tokens);
    event LevelUp(address indexed player, uint256 newLevel);
    event DailyBonusClaimed(address indexed player, uint256 bonus, uint256 streak);
    event LeaderboardUpdated(address indexed player, uint256 rank);
    
    constructor() ERC20("BaseTapper Token", "BTAP") Ownable(msg.sender) {
        // Mint initial supply to contract for rewards
        _mint(address(this), 1000000 * 10**18); // 1M BTAP
    }
    
    // Record gems earned from tapping
    function recordGems(uint256 amount) external {
        playerGems[msg.sender] += amount;
        playerXP[msg.sender] += amount;
        
        // Check for level up
        uint256 currentLevel = playerLevel[msg.sender];
        uint256 xpNeeded = (currentLevel + 1) * 100;
        
        if (playerXP[msg.sender] >= xpNeeded) {
            playerLevel[msg.sender]++;
            emit LevelUp(msg.sender, playerLevel[msg.sender]);
        }
        
        emit GemsEarned(msg.sender, amount);
        updateLeaderboard(msg.sender);
    }
    
    // Claim daily bonus
    function claimDailyBonus() external nonReentrant {
        require(!hasClaimedToday[msg.sender], "Already claimed today");
        require(block.timestamp >= lastClaimTime[msg.sender] + DAILY_CLAIM_COOLDOWN, "Cooldown active");
        
        // Calculate streak
        uint256 timeSinceLastClaim = block.timestamp - lastClaimTime[msg.sender];
        if (timeSinceLastClaim <= 2 days) {
            dailyStreak[msg.sender]++;
        } else {
            dailyStreak[msg.sender] = 1;
        }
        
        // Calculate bonus based on level and streak
        uint256 baseBonus = 100;
        uint256 levelBonus = playerLevel[msg.sender] * 10;
        uint256 streakBonus = dailyStreak[msg.sender] * 5;
        uint256 totalBonus = baseBonus + levelBonus + streakBonus;
        
        playerGems[msg.sender] += totalBonus;
        lastClaimTime[msg.sender] = block.timestamp;
        hasClaimedToday[msg.sender] = true;
        
        emit DailyBonusClaimed(msg.sender, totalBonus, dailyStreak[msg.sender]);
    }
    
    // Convert gems to BTAP tokens
    function claimTokens(uint256 gemAmount) external nonReentrant {
        require(playerGems[msg.sender] >= gemAmount, "Insufficient gems");
        require(gemAmount >= GEMS_TO_TOKEN_RATE, "Minimum 1000 gems required");
        
        uint256 tokenAmount = (gemAmount * 10**18) / GEMS_TO_TOKEN_RATE;
        require(tokenAmount <= MAX_DAILY_CLAIM, "Exceeds daily claim limit");
        require(balanceOf(address(this)) >= tokenAmount, "Insufficient contract balance");
        
        playerGems[msg.sender] -= gemAmount;
        _transfer(address(this), msg.sender, tokenAmount);
        
        emit TokensClaimed(msg.sender, gemAmount, tokenAmount);
    }
    
    // Update leaderboard
    function updateLeaderboard(address player) internal {
        uint256 playerScore = playerGems[player];
        
        // Simple leaderboard logic (top 100)
        if (topPlayers.length < 100) {
            topPlayers.push(player);
            leaderboardRank[player] = topPlayers.length;
        } else {
            // Find position and insert
            for (uint256 i = 0; i < topPlayers.length; i++) {
                if (playerScore > playerGems[topPlayers[i]]) {
                    // Shift and insert
                    for (uint256 j = topPlayers.length - 1; j > i; j--) {
                        topPlayers[j] = topPlayers[j - 1];
                        leaderboardRank[topPlayers[j]] = j + 1;
                    }
                    topPlayers[i] = player;
                    leaderboardRank[player] = i + 1;
                    emit LeaderboardUpdated(player, i + 1);
                    break;
                }
            }
        }
    }
    
    // Get player stats
    function getPlayerStats(address player) external view returns (
        uint256 gems,
        uint256 level,
        uint256 xp,
        uint256 streak,
        uint256 rank
    ) {
        return (
            playerGems[player],
            playerLevel[player],
            playerXP[player],
            dailyStreak[player],
            leaderboardRank[player]
        );
    }
    
    // Get top players
    function getTopPlayers(uint256 count) external view returns (address[] memory) {
        uint256 returnCount = count > topPlayers.length ? topPlayers.length : count;
        address[] memory result = new address[](returnCount);
        
        for (uint256 i = 0; i < returnCount; i++) {
            result[i] = topPlayers[i];
        }
        
        return result;
    }
    
    // Owner functions
    function addRewards(uint256 amount) external onlyOwner {
        _mint(address(this), amount);
    }
    
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(balanceOf(address(this)) >= amount, "Insufficient balance");
        _transfer(address(this), owner(), amount);
    }
    
    // Reset daily claim status (called by backend daily)
    function resetDailyClaims(address[] calldata players) external onlyOwner {
        for (uint256 i = 0; i < players.length; i++) {
            hasClaimedToday[players[i]] = false;
        }
    }
}
