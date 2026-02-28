// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type YokiRegisteredEventProps = Omit<YokiRegisteredEvent, NonNullable<FunctionPropertyNames<YokiRegisteredEvent>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatYokiRegisteredEventProps = Omit<YokiRegisteredEventProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class YokiRegisteredEvent implements CompatEntity {

    constructor(
        
        id: string,
        blockHeight: bigint,
        blockHash: string,
        transactionHash: string,
        contractAddress: string,
        owner: string,
        tokenId: bigint,
        slotIndex: number,
        totalScore: bigint,
    ) {
        this.id = id;
        this.blockHeight = blockHeight;
        this.blockHash = blockHash;
        this.transactionHash = transactionHash;
        this.contractAddress = contractAddress;
        this.owner = owner;
        this.tokenId = tokenId;
        this.slotIndex = slotIndex;
        this.totalScore = totalScore;
        
    }

    public id: string;
    public blockHeight: bigint;
    public blockHash: string;
    public transactionHash: string;
    public contractAddress: string;
    public owner: string;
    public tokenId: bigint;
    public slotIndex: number;
    public totalScore: bigint;
    

    get _name(): string {
        return 'YokiRegisteredEvent';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save YokiRegisteredEvent entity without an ID");
        await store.set('YokiRegisteredEvent', id.toString(), this as unknown as CompatYokiRegisteredEventProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove YokiRegisteredEvent entity without an ID");
        await store.remove('YokiRegisteredEvent', id.toString());
    }

    static async get(id: string): Promise<YokiRegisteredEvent | undefined> {
        assert((id !== null && id !== undefined), "Cannot get YokiRegisteredEvent entity without an ID");
        const record = await store.get('YokiRegisteredEvent', id.toString());
        if (record) {
            return this.create(record as unknown as YokiRegisteredEventProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<YokiRegisteredEventProps>[], options: GetOptions<YokiRegisteredEventProps>): Promise<YokiRegisteredEvent[]> {
        // @ts-expect-error getByFields exists at runtime in SubQuery node
        const records = await store.getByFields<CompatYokiRegisteredEventProps>('YokiRegisteredEvent', filter  as unknown as FieldsExpression<CompatYokiRegisteredEventProps>[], options as unknown as GetOptions<CompatYokiRegisteredEventProps>);
        return records.map((record: CompatYokiRegisteredEventProps) => this.create(record as unknown as YokiRegisteredEventProps));
    }

    static create(record: YokiRegisteredEventProps): YokiRegisteredEvent {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockHeight,
            record.blockHash,
            record.transactionHash,
            record.contractAddress,
            record.owner,
            record.tokenId,
            record.slotIndex,
            record.totalScore,
        );
        Object.assign(entity,record);
        return entity;
    }
}
