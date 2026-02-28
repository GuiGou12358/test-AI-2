// Auto-generated , DO NOT EDIT
import {Entity, FunctionPropertyNames, FieldsExpression, GetOptions } from "@subql/types-core";
import assert from 'assert';



export type YokiMintedEventProps = Omit<YokiMintedEvent, NonNullable<FunctionPropertyNames<YokiMintedEvent>> | '_name'>;

/*
 * Compat types allows for support of alternative `id` types without refactoring the node
 */
type CompatYokiMintedEventProps = Omit<YokiMintedEventProps, 'id'> & { id: string; };
type CompatEntity = Omit<Entity, 'id'> & { id: string; };

export class YokiMintedEvent implements CompatEntity {

    constructor(
        
        id: string,
        blockHeight: bigint,
        blockHash: string,
        transactionHash: string,
        contractAddress: string,
        tokenId: bigint,
        owner: string,
        name: string,
        force: number,
        rapidite: number,
        dexterite: number,
        resistance: number,
        intelligence: number,
    ) {
        this.id = id;
        this.blockHeight = blockHeight;
        this.blockHash = blockHash;
        this.transactionHash = transactionHash;
        this.contractAddress = contractAddress;
        this.tokenId = tokenId;
        this.owner = owner;
        this.name = name;
        this.force = force;
        this.rapidite = rapidite;
        this.dexterite = dexterite;
        this.resistance = resistance;
        this.intelligence = intelligence;
        
    }

    public id: string;
    public blockHeight: bigint;
    public blockHash: string;
    public transactionHash: string;
    public contractAddress: string;
    public tokenId: bigint;
    public owner: string;
    public name: string;
    public force: number;
    public rapidite: number;
    public dexterite: number;
    public resistance: number;
    public intelligence: number;
    

    get _name(): string {
        return 'YokiMintedEvent';
    }

    async save(): Promise<void> {
        const id = this.id;
        assert(id !== null, "Cannot save YokiMintedEvent entity without an ID");
        await store.set('YokiMintedEvent', id.toString(), this as unknown as CompatYokiMintedEventProps);
    }

    static async remove(id: string): Promise<void> {
        assert(id !== null, "Cannot remove YokiMintedEvent entity without an ID");
        await store.remove('YokiMintedEvent', id.toString());
    }

    static async get(id: string): Promise<YokiMintedEvent | undefined> {
        assert((id !== null && id !== undefined), "Cannot get YokiMintedEvent entity without an ID");
        const record = await store.get('YokiMintedEvent', id.toString());
        if (record) {
            return this.create(record as unknown as YokiMintedEventProps);
        } else {
            return;
        }
    }


    /**
     * Gets entities matching the specified filters and options.
     *
     * ⚠️ This function will first search cache data followed by DB data. Please consider this when using order and offset options.⚠️
     * */
    static async getByFields(filter: FieldsExpression<YokiMintedEventProps>[], options: GetOptions<YokiMintedEventProps>): Promise<YokiMintedEvent[]> {
        const records = await store.getByFields<CompatYokiMintedEventProps>('YokiMintedEvent', filter  as unknown as FieldsExpression<CompatYokiMintedEventProps>[], options as unknown as GetOptions<CompatYokiMintedEventProps>);
        return records.map(record => this.create(record as unknown as YokiMintedEventProps));
    }

    static create(record: YokiMintedEventProps): YokiMintedEvent {
        assert(record.id !== undefined && record.id !== null, "id must be provided");
        const entity = new this(
            record.id,
            record.blockHeight,
            record.blockHash,
            record.transactionHash,
            record.contractAddress,
            record.tokenId,
            record.owner,
            record.name,
            record.force,
            record.rapidite,
            record.dexterite,
            record.resistance,
            record.intelligence,
        );
        Object.assign(entity,record);
        return entity;
    }
}
