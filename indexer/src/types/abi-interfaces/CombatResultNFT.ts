// SPDX-License-Identifier: Apache-2.0

// Auto-generated , DO NOT EDIT
import {EthereumLog, EthereumTransaction} from "@subql/types-ethereum";
type LightEthereumLog<T> = EthereumLog<T & import("@subql/types-ethereum/dist/ethereum/interfaces").EthereumResult>;

import {ApprovalEvent, ApprovalForAllEvent, CombatResultCreatedEvent, OwnershipTransferredEvent, TransferEvent, CombatResultNFT} from '../contracts/CombatResultNFT'


export type ApprovalLog = EthereumLog<ApprovalEvent["args"]>

export type ApprovalForAllLog = EthereumLog<ApprovalForAllEvent["args"]>

export type CombatResultCreatedLog = EthereumLog<CombatResultCreatedEvent["args"]>

export type OwnershipTransferredLog = EthereumLog<OwnershipTransferredEvent["args"]>

export type TransferLog = EthereumLog<TransferEvent["args"]>


export type LightApprovalLog = LightEthereumLog<ApprovalEvent["args"]>

export type LightApprovalForAllLog = LightEthereumLog<ApprovalForAllEvent["args"]>

export type LightCombatResultCreatedLog = LightEthereumLog<CombatResultCreatedEvent["args"]>

export type LightOwnershipTransferredLog = LightEthereumLog<OwnershipTransferredEvent["args"]>

export type LightTransferLog = LightEthereumLog<TransferEvent["args"]>


export type ApproveTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['approve']>>

export type ArenaTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['arena']>>

export type BalanceOfTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['balanceOf']>>

export type GetApprovedTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['getApproved']>>

export type IsApprovedForAllTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['isApprovedForAll']>>

export type MintCombatResultTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['mintCombatResult']>>

export type NameTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['name']>>

export type OwnerTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['owner']>>

export type OwnerOfTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['ownerOf']>>

export type RenounceOwnershipTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['renounceOwnership']>>

export type SafeTransferFrom_address_address_uint256_Transaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['safeTransferFrom(address,address,uint256)']>>

export type SafeTransferFrom_address_address_uint256_bytes_Transaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['safeTransferFrom(address,address,uint256,bytes)']>>

export type SetApprovalForAllTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['setApprovalForAll']>>

export type SetArenaTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['setArena']>>

export type SupportsInterfaceTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['supportsInterface']>>

export type SymbolTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['symbol']>>

export type TokenURITransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['tokenURI']>>

export type TotalSupplyTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['totalSupply']>>

export type TransferFromTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['transferFrom']>>

export type TransferOwnershipTransaction = EthereumTransaction<Parameters<CombatResultNFT['functions']['transferOwnership']>>

