// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title BaseTapperAirdrop
 * @dev Advanced airdrop contract with referral system, task verification, and anti-bot protection
 */
contract BaseTapperAirdrop is Ownable, ReentrancyGuard {
    IERC20 public btapToken;
    
    // Airdrop configuration
    uint256 public airdropAmount = 100 * 10**18; // 100 BTAP per claim
    uint256 public referralBonus = 50 * 10**18; // 50 BTAP per referral
    uint256 public claimCooldown = 24 hours;
    uint256 public maxClaimsPerAddress = 10;
    
    // Tracking
    mapping(address => uint256) public lastClaimTime;
    mapping(address => uint256) public claimCount;
    mapping(address => address) public referrer;
    mapping(address => uint256) public referralCount;
    mapping(address => uint256) public totalEarned;
    mapping(address => bool) public hasClaimedInitial;
    mapping(address => bool) public isWhitelisted;
    mapping(address => bool) public isBlacklisted;
    
    // Task verification
    mapping(address => mapping(uint256 => bool)) public taskCompleted;
    mapping(uint256 => uint256) public taskReward;
    
    // Statistics
    uint256 public totalClaimed;
    uint256 public totalUsers;
    uint256 public totalReferrals;
    
    // Control
    bool public airdropActive = true;
    bool public whitelistOnly = false;
    
    // Events
    event AirdropClaimed(address indexed user, uint256 amount, uint256 timestamp);
    event ReferralClaimed(address indexed referrer, address indexed referee, uint256 amount);
    event TaskCompleted(address indexed user, uint256 taskId, uint256 reward);
    event WhitelistUpdated(address indexed user, bool status);
    event BlacklistUpdated(address indexed user, bool status);
    
    constructor(address _btapToken) {
        btapToken = IERC20(_btapToken);
        
        // Initialize task rewards
        taskReward[1] = 50 * 10**18;  // Connect wallet: 50 BTAP
        taskReward[2] = 100 * 10**18; // Play 10 games: 100 BTAP
        taskReward[3] = 200 * 10**18; // Reach level 5: 200 BTAP
        taskReward[4] = 500 * 10**18; // Invite 5 friends: 500 BTAP
    }
    
    /**
     * @dev Claim initial airdrop with optional referral
     */
    function claimAirdrop(address _referrer) external nonReentrant {
        require(airdropActive, "Airdrop not active");
        require(!isBlacklisted[msg.sender], "Address blacklisted");
        
        if (whitelistOnly) {
            require(isWhitelisted[msg.sender], "Not whitelisted");
        }
        
        require(!hasClaimedInitial[msg.sender], "Already claimed initial airdrop");
        require(
            block.timestamp >= lastClaimTime[msg.sender] + claimCooldown,
            "Claim cooldown active"
        );
        require(claimCount[msg.sender] < maxClaimsPerAddress, "Max claims reached");
        
        // Update tracking
        if (!hasClaimedInitial[msg.sender]) {
            hasClaimedInitial[msg.sender] = true;
            totalUsers++;
        }
        
        lastClaimTime[msg.sender] = block.timestamp;
        claimCount[msg.sender]++;
        totalEarned[msg.sender] += airdropAmount;
        totalClaimed += airdropAmount;
        
        // Handle referral
        if (_referrer != address(0) && _referrer != msg.sender && referrer[msg.sender] == address(0)) {
            referrer[msg.sender] = _referrer;
            referralCount[_referrer]++;
            totalReferrals++;
            
            // Send referral bonus
            totalEarned[_referrer] += referralBonus;
            totalClaimed += referralBonus;
            
            require(
                btapToken.transfer(_referrer, referralBonus),
                "Referral bonus transfer failed"
            );
            
            emit ReferralClaimed(_referrer, msg.sender, referralBonus);
        }
        
        // Send airdrop
        require(
            btapToken.transfer(msg.sender, airdropAmount),
            "Airdrop transfer failed"
        );
        
        emit AirdropClaimed(msg.sender, airdropAmount, block.timestamp);
    }
    
    /**
     * @dev Claim daily airdrop (after initial claim)
     */
    function claimDaily() external nonReentrant {
        require(airdropActive, "Airdrop not active");
        require(!isBlacklisted[msg.sender], "Address blacklisted");
        require(hasClaimedInitial[msg.sender], "Must claim initial airdrop first");
        require(
            block.timestamp >= lastClaimTime[msg.sender] + claimCooldown,
            "Claim cooldown active"
        );
        require(claimCount[msg.sender] < maxClaimsPerAddress, "Max claims reached");
        
        lastClaimTime[msg.sender] = block.timestamp;
        claimCount[msg.sender]++;
        totalEarned[msg.sender] += airdropAmount;
        totalClaimed += airdropAmount;
        
        require(
            btapToken.transfer(msg.sender, airdropAmount),
            "Daily claim transfer failed"
        );
        
        emit AirdropClaimed(msg.sender, airdropAmount, block.timestamp);
    }
    
    /**
     * @dev Complete task and claim reward
     */
    function completeTask(uint256 taskId) external nonReentrant {
        require(airdropActive, "Airdrop not active");
        require(!isBlacklisted[msg.sender], "Address blacklisted");
        require(hasClaimedInitial[msg.sender], "Must claim initial airdrop first");
        require(!taskCompleted[msg.sender][taskId], "Task already completed");
        require(taskReward[taskId] > 0, "Invalid task");
        
        taskCompleted[msg.sender][taskId] = true;
        uint256 reward = taskReward[taskId];
        totalEarned[msg.sender] += reward;
        totalClaimed += reward;
        
        require(
            btapToken.transfer(msg.sender, reward),
            "Task reward transfer failed"
        );
        
        emit TaskCompleted(msg.sender, taskId, reward);
    }
    
    /**
     * @dev Get user info
     */
    function getUserInfo(address user) external view returns (
        bool claimed,
        uint256 claims,
        uint256 earned,
        uint256 referrals,
        uint256 nextClaimTime,
        bool canClaim
    ) {
        claimed = hasClaimedInitial[user];
        claims = claimCount[user];
        earned = totalEarned[user];
        referrals = referralCount[user];
        nextClaimTime = lastClaimTime[user] + claimCooldown;
        canClaim = block.timestamp >= nextClaimTime && claims < maxClaimsPerAddress;
    }
    
    /**
     * @dev Get airdrop statistics
     */
    function getStats() external view returns (
        uint256 _totalClaimed,
        uint256 _totalUsers,
        uint256 _totalReferrals,
        uint256 _airdropAmount,
        uint256 _referralBonus,
        bool _active
    ) {
        _totalClaimed = totalClaimed;
        _totalUsers = totalUsers;
        _totalReferrals = totalReferrals;
        _airdropAmount = airdropAmount;
        _referralBonus = referralBonus;
        _active = airdropActive;
    }
    
    /**
     * @dev Check if user completed task
     */
    function isTaskCompleted(address user, uint256 taskId) external view returns (bool) {
        return taskCompleted[user][taskId];
    }
    
    // Admin functions
    
    function setAirdropAmount(uint256 _amount) external onlyOwner {
        airdropAmount = _amount;
    }
    
    function setReferralBonus(uint256 _amount) external onlyOwner {
        referralBonus = _amount;
    }
    
    function setClaimCooldown(uint256 _cooldown) external onlyOwner {
        claimCooldown = _cooldown;
    }
    
    function setMaxClaims(uint256 _max) external onlyOwner {
        maxClaimsPerAddress = _max;
    }
    
    function setTaskReward(uint256 taskId, uint256 reward) external onlyOwner {
        taskReward[taskId] = reward;
    }
    
    function setAirdropActive(bool _active) external onlyOwner {
        airdropActive = _active;
    }
    
    function setWhitelistOnly(bool _whitelistOnly) external onlyOwner {
        whitelistOnly = _whitelistOnly;
    }
    
    function updateWhitelist(address user, bool status) external onlyOwner {
        isWhitelisted[user] = status;
        emit WhitelistUpdated(user, status);
    }
    
    function updateWhitelistBatch(address[] calldata users, bool status) external onlyOwner {
        for (uint256 i = 0; i < users.length; i++) {
            isWhitelisted[users[i]] = status;
            emit WhitelistUpdated(users[i], status);
        }
    }
    
    function updateBlacklist(address user, bool status) external onlyOwner {
        isBlacklisted[user] = status;
        emit BlacklistUpdated(user, status);
    }
    
    function withdrawTokens(uint256 amount) external onlyOwner {
        require(btapToken.transfer(owner(), amount), "Withdrawal failed");
    }
    
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = btapToken.balanceOf(address(this));
        require(btapToken.transfer(owner(), balance), "Emergency withdrawal failed");
    }
}
