// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./YokiNFT.sol";
import "./CombatResultNFT.sol";

/**
 * @title Arena
 * @dev Arène de combat : deux Yoki maximum peuvent s'affronter
 */
contract Arena is Ownable, ReentrancyGuard {
    YokiNFT public immutable yokiNFT;
    CombatResultNFT public immutable combatResultNFT;

    struct Fighter {
        address owner;
        uint256 tokenId;
        uint256 totalScore;
    }

    Fighter public fighter1;
    Fighter public fighter2;
    bool public combatInProgress;
    uint256 public totalCombats;

    /// @notice Un Yoki a été enregistré dans l'arène
    event YokiRegistered(
        address indexed owner,
        uint256 indexed tokenId,
        uint8 slotIndex,
        uint256 totalScore
    );

    /// @notice Combat résolu
    event CombatResolved(
        uint256 indexed winnerTokenId,
        uint256 indexed loserTokenId,
        address indexed winner,
        address loser,
        uint256 winnerScore,
        uint256 loserScore,
        uint256 combatResultTokenId
    );

    error ArenaFull();
    error CombatNotReady();
    error InvalidToken();
    error NotYokiOwner();
    error YokiAlreadyRegistered();

    constructor(address _yokiNFT, address _combatResultNFT) Ownable(msg.sender) {
        yokiNFT = YokiNFT(_yokiNFT);
        combatResultNFT = CombatResultNFT(_combatResultNFT);
    }

    /**
     * @dev Enregistre un Yoki dans l'arène (slot 1 ou 2)
     * Le Yoki est transféré à l'arène pendant le combat
     */
    function register(uint256 tokenId) external nonReentrant {
        if (yokiNFT.ownerOf(tokenId) != msg.sender) revert NotYokiOwner();
        if (combatInProgress) revert CombatNotReady();

        uint256 totalScore = yokiNFT.getTotalScore(tokenId);

        if (fighter1.owner == address(0)) {
            fighter1 = Fighter({owner: msg.sender, tokenId: tokenId, totalScore: totalScore});
            yokiNFT.transferFrom(msg.sender, address(this), tokenId);
            emit YokiRegistered(msg.sender, tokenId, 1, totalScore);
        } else if (fighter2.owner == address(0)) {
            if (fighter1.tokenId == tokenId) revert YokiAlreadyRegistered();
            fighter2 = Fighter({owner: msg.sender, tokenId: tokenId, totalScore: totalScore});
            yokiNFT.transferFrom(msg.sender, address(this), tokenId);
            combatInProgress = true;
            emit YokiRegistered(msg.sender, tokenId, 2, totalScore);
        } else {
            revert ArenaFull();
        }
    }

    /**
     * @dev Résout le combat : le Yoki avec le score total le plus élevé gagne
     * En cas d'égalité, le premier enregistré gagne
     */
    function resolveCombat() external nonReentrant {
        if (!combatInProgress) revert CombatNotReady();

        uint256 winnerTokenId;
        uint256 loserTokenId;
        address winner;
        address loser;
        uint256 winnerScore;
        uint256 loserScore;

        if (fighter1.totalScore >= fighter2.totalScore) {
            winnerTokenId = fighter1.tokenId;
            loserTokenId = fighter2.tokenId;
            winner = fighter1.owner;
            loser = fighter2.owner;
            winnerScore = fighter1.totalScore;
            loserScore = fighter2.totalScore;
        } else {
            winnerTokenId = fighter2.tokenId;
            loserTokenId = fighter1.tokenId;
            winner = fighter2.owner;
            loser = fighter1.owner;
            winnerScore = fighter2.totalScore;
            loserScore = fighter1.totalScore;
        }

        // Retour des Yoki à leurs propriétaires
        yokiNFT.transferFrom(address(this), fighter1.owner, fighter1.tokenId);
        yokiNFT.transferFrom(address(this), fighter2.owner, fighter2.tokenId);

        // Mint du NFT représentant l'issue du combat au gagnant
        uint256 combatResultTokenId = combatResultNFT.mintCombatResult(
            winner,
            loser,
            winnerTokenId,
            loserTokenId,
            winnerScore,
            loserScore
        );

        emit CombatResolved(
            winnerTokenId,
            loserTokenId,
            winner,
            loser,
            winnerScore,
            loserScore,
            combatResultTokenId
        );

        totalCombats++;
        _resetArena();
    }

    function _resetArena() private {
        fighter1 = Fighter({owner: address(0), tokenId: 0, totalScore: 0});
        fighter2 = Fighter({owner: address(0), tokenId: 0, totalScore: 0});
        combatInProgress = false;
    }
}
