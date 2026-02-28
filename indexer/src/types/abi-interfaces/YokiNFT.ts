// SPDX-License-Identifier: Apache-2.0

// Auto-generated , DO NOT EDIT
import {EthereumLog, EthereumTransaction, LightEthereumLog} from "@subql/types-ethereum";

import {ApprovalEvent, ApprovalForAllEvent, OwnershipTransferredEvent, PausedEvent, TransferEvent, UnpausedEvent, YokiMintedEvent, YokiNFT} from '../contracts/YokiNFT'


export type ApprovalLog = EthereumLog<ApprovalEvent["args"]>

export type ApprovalForAllLog = EthereumLog<ApprovalForAllEvent["args"]>

export type OwnershipTransferredLog = EthereumLog<OwnershipTransferredEvent["args"]>

export type PausedLog = EthereumLog<PausedEvent["args"]>

export type TransferLog = EthereumLog<TransferEvent["args"]>

export type UnpausedLog = EthereumLog<UnpausedEvent["args"]>

export type YokiMintedLog = EthereumLog<YokiMintedEvent["args"]>


export type LightApprovalLog = LightEthereumLog<ApprovalEvent["args"]>

export type LightApprovalForAllLog = LightEthereumLog<ApprovalForAllEvent["args"]>

export type LightOwnershipTransferredLog = LightEthereumLog<OwnershipTransferredEvent["args"]>

export type LightPausedLog = LightEthereumLog<PausedEvent["args"]>

export type LightTransferLog = LightEthereumLog<TransferEvent["args"]>

export type LightUnpausedLog = LightEthereumLog<UnpausedEvent["args"]>

export type LightYokiMintedLog = LightEthereumLog<YokiMintedEvent["args"]>


export type ApproveTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['approve']>>

export type BalanceOfTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['balanceOf']>>

export type GetApprovedTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['getApproved']>>

export type GetAttributesTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['getAttributes']>>

export type GetTotalScoreTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['getTotalScore']>>

export type IsApprovedForAllTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['isApprovedForAll']>>

export type MintTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['mint']>>

export type NameTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['name']>>

export type OwnerTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['owner']>>

export type OwnerOfTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['ownerOf']>>

export type PauseTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['pause']>>

export type PausedTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['paused']>>

export type RenounceOwnershipTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['renounceOwnership']>>

export type SafeTransferFrom_address_address_uint256_Transaction = EthereumTransaction<Parameters<YokiNFT['functions']['safeTransferFrom(address,address,uint256)']>>

export type SafeTransferFrom_address_address_uint256_bytes_Transaction = EthereumTransaction<Parameters<YokiNFT['functions']['safeTransferFrom(address,address,uint256,bytes)']>>

export type SetApprovalForAllTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['setApprovalForAll']>>

export type SupportsInterfaceTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['supportsInterface']>>

export type SymbolTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['symbol']>>

export type TokenURITransaction = EthereumTransaction<Parameters<YokiNFT['functions']['tokenURI']>>

export type TransferFromTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['transferFrom']>>

export type TransferOwnershipTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['transferOwnership']>>

export type UnpauseTransaction = EthereumTransaction<Parameters<YokiNFT['functions']['unpause']>>

