// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CombatResultNFT
 * @dev NFT représentant l'issue d'un combat entre deux Yoki
 */
contract CombatResultNFT is ERC721, Ownable {
    struct CombatResult {
        address winner;
        address loser;
        uint256 winnerTokenId;
        uint256 loserTokenId;
        uint256 winnerScore;
        uint256 loserScore;
    }

    /// @notice Événement émis lors de la création d'un NFT d'issue de combat
    event CombatResultCreated(
        uint256 indexed tokenId,
        address indexed winner,
        address indexed loser,
        uint256 winnerTokenId,
        uint256 loserTokenId,
        uint256 winnerScore,
        uint256 loserScore
    );

    address public arena;
    uint256 private _nextTokenId;

    error OnlyArena();

    modifier onlyArena() {
        if (msg.sender != arena) revert OnlyArena();
        _;
    }

    constructor() ERC721("CombatResult", "COMBAT") Ownable(msg.sender) {}

    /**
     * @dev Définit l'adresse de l'arène (autorité pour minter)
     */
    function setArena(address _arena) external onlyOwner {
        arena = _arena;
    }

    /**
     * @dev Appelé par l'arène après résolution du combat
     */
    function mintCombatResult(
        address winner,
        address loser,
        uint256 winnerTokenId,
        uint256 loserTokenId,
        uint256 winnerScore,
        uint256 loserScore
    ) external onlyArena returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(winner, tokenId);

        emit CombatResultCreated(
            tokenId,
            winner,
            loser,
            winnerTokenId,
            loserTokenId,
            winnerScore,
            loserScore
        );

        return tokenId;
    }

    /**
     * @dev Retourne les données du combat (non stockées onchain pour économiser le gas)
     * Les données sont disponibles via les événements indexés
     */
    function totalSupply() external view returns (uint256) {
        return _nextTokenId;
    }
}
