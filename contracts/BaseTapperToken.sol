// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title BaseTapperToken (BTAP)
 * @dev Real ERC-20 token for BaseTapper game
 * Features:
 * - Mintable by game contract
 * - Burnable for upgrades
 * - Pausable for emergencies
 * - Daily mint limits per player
 */
contract BaseTapperToken is ERC20, Ownable, Pausable {
    // Daily mint limit per player (anti-bot)
    uint256 public constant DAILY_MINT_LIMIT = 10000 * 10**18; // 10,000 BTAP
    
    // Mapping to track daily mints
    mapping(address => uint256) public lastMintDay;
    mapping(address => uint256) public dailyMintAmount;
    
    // Game contract address (authorized minter)
    address public gameContract;
    
    // Events
    event GameContractUpdated(address indexed newGameContract);
    event TokensMinted(address indexed player, uint256 amount);
    event TokensBurned(address indexed player, uint256 amount);
    
    constructor() ERC20("BaseTapper Token", "BTAP") {
        // Mint initial supply to deployer (for liquidity pool)
        _mint(msg.sender, 1000000 * 10**18); // 1M BTAP
    }
    
    /**
     * @dev Set game contract address (only owner)
     */
    function setGameContract(address _gameContract) external onlyOwner {
        require(_gameContract != address(0), "Invalid address");
        gameContract = _gameContract;
        emit GameContractUpdated(_gameContract);
    }
    
    /**
     * @dev Mint tokens to player (only game contract)
     * Enforces daily limits
     */
    function mintReward(address player, uint256 amount) external whenNotPaused {
        require(msg.sender == gameContract, "Only game contract");
        require(player != address(0), "Invalid player");
        
        // Check daily limit
        uint256 currentDay = block.timestamp / 1 days;
        if (lastMintDay[player] != currentDay) {
            // New day, reset counter
            lastMintDay[player] = currentDay;
            dailyMintAmount[player] = 0;
        }
        
        require(
            dailyMintAmount[player] + amount <= DAILY_MINT_LIMIT,
            "Daily mint limit exceeded"
        );
        
        dailyMintAmount[player] += amount;
        _mint(player, amount);
        
        emit TokensMinted(player, amount);
    }
    
    /**
     * @dev Burn tokens for in-game upgrades
     */
    function burnForUpgrade(uint256 amount) external whenNotPaused {
        require(amount > 0, "Amount must be > 0");
        _burn(msg.sender, amount);
        emit TokensBurned(msg.sender, amount);
    }
    
    /**
     * @dev Emergency pause
     */
    function pause() external onlyOwner {
        _pause();
    }
    
    /**
     * @dev Unpause
     */
    function unpause() external onlyOwner {
        _unpause();
    }
    
    /**
     * @dev Get remaining daily mint allowance
     */
    function getRemainingDailyMint(address player) external view returns (uint256) {
        uint256 currentDay = block.timestamp / 1 days;
        if (lastMintDay[player] != currentDay) {
            return DAILY_MINT_LIMIT;
        }
        return DAILY_MINT_LIMIT - dailyMintAmount[player];
    }
}
