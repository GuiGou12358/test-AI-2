// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CombatResultCreatedEventProps = Omit<CombatResultCreatedEvent, NonNullable<FunctionPropertyNames<CombatResultCreatedEvent>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCombatResultCreatedEventProps = Omit<CombatResultCreatedEventProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CombatResultCreatedEvent implements CompatEntity {

    constructor(
        
        id: string,
        blockHeight: bigint,
        blockHash: string,
        transactionHash: string,
        contractAddress: string,
        tokenId: bigint,
        winner: string,
        loser: string,
        winnerTokenId: bigint,
        loserTokenId: bigint,
        winnerScore: bigint,
        loserScore: bigint,
    ) {
        this.id = id;
        this.blockHeight = blockHeight;
        this.blockHash = blockHash;
        this.transactionHash = transactionHash;
        this.contractAddress = contractAddress;
        this.tokenId = tokenId;
        this.winner = winner;
        this.loser = loser;
        this.winnerTokenId = winnerTokenId;
        this.loserTokenId = loserTokenId;
        this.winnerScore = winnerScore;
        this.loserScore = loserScore;
        
    }

    public id: string;
    public blockHeight: bigint;
    public blockHash: string;
    public transactionHash: string;
    public contractAddress: string;
    public tokenId: bigint;
    public winner: string;
    public loser: string;
    public winnerTokenId: bigint;
    public loserTokenId: bigint;
    public winnerScore: bigint;
    public loserScore: bigint;
    

    get _name(): string {
        return 'CombatResultCreatedEvent';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CombatResultCreatedEvent entity without an ID");
        await store.set('CombatResultCreatedEvent', id.toString(), this as unknown as CompatCombatResultCreatedEventProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CombatResultCreatedEvent entity without an ID");
        await store.remove('CombatResultCreatedEvent', id.toString());
    }

    static async get(id: string): Promise<CombatResultCreatedEvent | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CombatResultCreatedEvent entity without an ID");
        const record = await store.get('CombatResultCreatedEvent', id.toString());
        if (record) {
            return this.create(record as unknown as CombatResultCreatedEventProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CombatResultCreatedEventProps>[], options: GetOptions<CombatResultCreatedEventProps>): Promise<CombatResultCreatedEvent[]> {
        // @ts-expect-error getByFields exists at runtime in SubQuery node
        const records = await store.getByFields<CompatCombatResultCreatedEventProps>('CombatResultCreatedEvent', filter  as unknown as FieldsExpression<CompatCombatResultCreatedEventProps>[], options as unknown as GetOptions<CompatCombatResultCreatedEventProps>);
        return records.map((record: CompatCombatResultCreatedEventProps) => this.create(record as unknown as CombatResultCreatedEventProps));
    }

    static create(record: CombatResultCreatedEventProps): CombatResultCreatedEvent {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockHeight,
            record.blockHash,
            record.transactionHash,
            record.contractAddress,
            record.tokenId,
            record.winner,
            record.loser,
            record.winnerTokenId,
            record.loserTokenId,
            record.winnerScore,
            record.loserScore,
        );
        Object.assign(entity,record);
        return entity;
    }
}
