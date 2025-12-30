// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./BaseTapperToken.sol";

/**
 * @title TokenFaucet
 * @dev Testnet faucet for BTAP tokens
 * Players can claim free tokens for testing
 */
contract TokenFaucet {
    BaseTapperToken public token;
    
    // Faucet settings
    uint256 public constant CLAIM_AMOUNT = 1000 * 10**18; // 1000 BTAP
    uint256 public constant CLAIM_COOLDOWN = 24 hours;
    
    // Track last claim time
    mapping(address => uint256) public lastClaimTime;
    
    // Events
    event TokensClaimed(address indexed user, uint256 amount);
    
    constructor(address _tokenAddress) {
        token = BaseTapperToken(_tokenAddress);
    }
    
    /**
     * @dev Claim free testnet tokens
     */
    function claimTokens() external {
        require(
            block.timestamp >= lastClaimTime[msg.sender] + CLAIM_COOLDOWN,
            "Claim cooldown active"
        );
        
        lastClaimTime[msg.sender] = block.timestamp;
        
        // Transfer tokens from faucet
        require(
            token.transfer(msg.sender, CLAIM_AMOUNT),
            "Transfer failed"
        );
        
        emit TokensClaimed(msg.sender, CLAIM_AMOUNT);
    }
    
    /**
     * @dev Get time until next claim
     */
    function getTimeUntilNextClaim(address user) external view returns (uint256) {
        uint256 nextClaimTime = lastClaimTime[user] + CLAIM_COOLDOWN;
        if (block.timestamp >= nextClaimTime) {
            return 0;
        }
        return nextClaimTime - block.timestamp;
    }
    
    /**
     * @dev Check if user can claim
     */
    function canClaim(address user) external view returns (bool) {
        return block.timestamp >= lastClaimTime[user] + CLAIM_COOLDOWN;
    }
}
