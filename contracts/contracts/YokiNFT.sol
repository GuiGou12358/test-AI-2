// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/**
 * @title YokiNFT
 * @dev NFT représentant un Yoki, combattant avec attributs (force, rapidité, dextérité, résistance, intelligence)
 */
contract YokiNFT is ERC721, Ownable, Pausable {
    struct YokiAttributes {
        string name;
        uint8 force;       // Force
        uint8 rapidite;    // Rapidité
        uint8 dexterite;   // Dextérité
        uint8 resistance;  // Résistance
        uint8 intelligence; // Intelligence
    }

    /// @notice Événement émis lorsqu'un Yoki est créé
    event YokiMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string name,
        uint8 force,
        uint8 rapidite,
        uint8 dexterite,
        uint8 resistance,
        uint8 intelligence
    );

    uint256 private _nextTokenId;
    mapping(uint256 => YokiAttributes) private _yokiData;

    constructor() ERC721("Yoki", "YOKI") Ownable(msg.sender) {}

    /**
     * @dev Crée un nouveau Yoki
     * @param to Adresse du propriétaire
     * @param name Nom du Yoki
     * @param force Valeur force (0-255)
     * @param rapidite Valeur rapidité (0-255)
     * @param dexterite Valeur dextérité (0-255)
     * @param resistance Valeur résistance (0-255)
     * @param intelligence Valeur intelligence (0-255)
     */
    function mint(
        address to,
        string calldata name,
        uint8 force,
        uint8 rapidite,
        uint8 dexterite,
        uint8 resistance,
        uint8 intelligence
    ) external onlyOwner whenNotPaused {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        _yokiData[tokenId] = YokiAttributes({
            name: name,
            force: force,
            rapidite: rapidite,
            dexterite: dexterite,
            resistance: resistance,
            intelligence: intelligence
        });

        emit YokiMinted(
            tokenId,
            to,
            name,
            force,
            rapidite,
            dexterite,
            resistance,
            intelligence
        );
    }

    /**
     * @dev Retourne les attributs d'un Yoki
     */
    function getAttributes(uint256 tokenId) external view returns (
        string memory name,
        uint8 force,
        uint8 rapidite,
        uint8 dexterite,
        uint8 resistance,
        uint8 intelligence
    ) {
        _requireOwned(tokenId);
        YokiAttributes storage yoki = _yokiData[tokenId];
        return (
            yoki.name,
            yoki.force,
            yoki.rapidite,
            yoki.dexterite,
            yoki.resistance,
            yoki.intelligence
        );
    }

    /**
     * @dev Calcule le score total d'un Yoki (somme des attributs)
     */
    function getTotalScore(uint256 tokenId) external view returns (uint256) {
        _requireOwned(tokenId);
        YokiAttributes storage yoki = _yokiData[tokenId];
        return uint256(yoki.force) + yoki.rapidite + yoki.dexterite +
               yoki.resistance + yoki.intelligence;
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }
}
