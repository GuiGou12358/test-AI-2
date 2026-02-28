// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Example
 * @dev Contrat exemple pour démontrer la structure du projet
 */
contract Example is Ownable {
    event ValueSet(uint256 indexed previousValue, uint256 indexed newValue);

    uint256 public value;

    constructor(uint256 initialValue) Ownable(msg.sender) {
        value = initialValue;
        emit ValueSet(0, initialValue);
    }

    function setValue(uint256 newValue) external onlyOwner {
        uint256 previousValue = value;
        value = newValue;
        emit ValueSet(previousValue, newValue);
    }
}
