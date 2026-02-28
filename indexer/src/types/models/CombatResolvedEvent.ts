// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type CombatResolvedEventProps = Omit<CombatResolvedEvent, NonNullable<FunctionPropertyNames<CombatResolvedEvent>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatCombatResolvedEventProps = Omit<CombatResolvedEventProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class CombatResolvedEvent implements CompatEntity {

    constructor(
        
        id: string,
        blockHeight: bigint,
        blockHash: string,
        transactionHash: string,
        contractAddress: string,
        winnerTokenId: bigint,
        loserTokenId: bigint,
        winner: string,
        loser: string,
        winnerScore: bigint,
        loserScore: bigint,
        combatResultTokenId: bigint,
    ) {
        this.id = id;
        this.blockHeight = blockHeight;
        this.blockHash = blockHash;
        this.transactionHash = transactionHash;
        this.contractAddress = contractAddress;
        this.winnerTokenId = winnerTokenId;
        this.loserTokenId = loserTokenId;
        this.winner = winner;
        this.loser = loser;
        this.winnerScore = winnerScore;
        this.loserScore = loserScore;
        this.combatResultTokenId = combatResultTokenId;
        
    }

    public id: string;
    public blockHeight: bigint;
    public blockHash: string;
    public transactionHash: string;
    public contractAddress: string;
    public winnerTokenId: bigint;
    public loserTokenId: bigint;
    public winner: string;
    public loser: string;
    public winnerScore: bigint;
    public loserScore: bigint;
    public combatResultTokenId: bigint;
    

    get _name(): string {
        return 'CombatResolvedEvent';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save CombatResolvedEvent entity without an ID");
        await store.set('CombatResolvedEvent', id.toString(), this as unknown as CompatCombatResolvedEventProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove CombatResolvedEvent entity without an ID");
        await store.remove('CombatResolvedEvent', id.toString());
    }

    static async get(id: string): Promise<CombatResolvedEvent | undefined> {
        assert((id !== null && id !== undefined), "Cannot get CombatResolvedEvent entity without an ID");
        const record = await store.get('CombatResolvedEvent', id.toString());
        if (record) {
            return this.create(record as unknown as CombatResolvedEventProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<CombatResolvedEventProps>[], options: GetOptions<CombatResolvedEventProps>): Promise<CombatResolvedEvent[]> {
        // @ts-expect-error getByFields exists at runtime in SubQuery node
        const records = await store.getByFields<CompatCombatResolvedEventProps>('CombatResolvedEvent', filter  as unknown as FieldsExpression<CompatCombatResolvedEventProps>[], options as unknown as GetOptions<CompatCombatResolvedEventProps>);
        return records.map((record: CompatCombatResolvedEventProps) => this.create(record as unknown as CombatResolvedEventProps));
    }

    static create(record: CombatResolvedEventProps): CombatResolvedEvent {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockHeight,
            record.blockHash,
            record.transactionHash,
            record.contractAddress,
            record.winnerTokenId,
            record.loserTokenId,
            record.winner,
            record.loser,
            record.winnerScore,
            record.loserScore,
            record.combatResultTokenId,
        );
        Object.assign(entity,record);
        return entity;
    }
}
