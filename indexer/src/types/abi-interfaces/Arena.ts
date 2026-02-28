// SPDX-License-Identifier: Apache-2.0

// Auto-generated , DO NOT EDIT
import {EthereumLog, EthereumTransaction, LightEthereumLog} from "@subql/types-ethereum";

import {CombatResolvedEvent, OwnershipTransferredEvent, YokiRegisteredEvent, Arena} from '../contracts/Arena'


export type CombatResolvedLog = EthereumLog<CombatResolvedEvent["args"]>

export type OwnershipTransferredLog = EthereumLog<OwnershipTransferredEvent["args"]>

export type YokiRegisteredLog = EthereumLog<YokiRegisteredEvent["args"]>


export type LightCombatResolvedLog = LightEthereumLog<CombatResolvedEvent["args"]>

export type LightOwnershipTransferredLog = LightEthereumLog<OwnershipTransferredEvent["args"]>

export type LightYokiRegisteredLog = LightEthereumLog<YokiRegisteredEvent["args"]>


export type CombatInProgressTransaction = EthereumTransaction<Parameters<Arena['functions']['combatInProgress']>>

export type CombatResultNFTTransaction = EthereumTransaction<Parameters<Arena['functions']['combatResultNFT']>>

export type Fighter1Transaction = EthereumTransaction<Parameters<Arena['functions']['fighter1']>>

export type Fighter2Transaction = EthereumTransaction<Parameters<Arena['functions']['fighter2']>>

export type OwnerTransaction = EthereumTransaction<Parameters<Arena['functions']['owner']>>

export type RegisterTransaction = EthereumTransaction<Parameters<Arena['functions']['register']>>

export type RenounceOwnershipTransaction = EthereumTransaction<Parameters<Arena['functions']['renounceOwnership']>>

export type ResolveCombatTransaction = EthereumTransaction<Parameters<Arena['functions']['resolveCombat']>>

export type TotalCombatsTransaction = EthereumTransaction<Parameters<Arena['functions']['totalCombats']>>

export type TransferOwnershipTransaction = EthereumTransaction<Parameters<Arena['functions']['transferOwnership']>>

export type YokiNFTTransaction = EthereumTransaction<Parameters<Arena['functions']['yokiNFT']>>

