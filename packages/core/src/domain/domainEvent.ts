import { v4 as uuidv4 } from 'uuid';
import { EventModel } from './eventModel';

export type DomainEventStatus =
  'INITIAL' | 'RETRYING' | 'PUBLISHED' | 'FAILED';

export class DomainEvent<T = unknown> {
  constructor(
    public readonly name: string,
    public readonly aggregateId: string,
    public readonly data: T,
    public readonly id: string = uuidv4(),
    private _retries: number = 0,
    private _status: DomainEventStatus = 'INITIAL',
    public readonly createdAt: string = new Date().toISOString(),
  ) {}

  get retries() {
    return this._retries;
  }

  get status() {
    return this._status;
  }

  public markPublished() {
    return (this._status = 'PUBLISHED');
  }

  public recordFailureToProcess() {
    this._retries++;

    if (this._retries === 3) {
      this._status = 'FAILED';
      return;
    }

    this._status = 'RETRYING';
  }

  public serializeData() {
    return JSON.stringify(this.data);
  }

  public serialize() {
    return JSON.stringify(this);
  }

  public static toDomain<T>(eventModel: EventModel): DomainEvent<T> {
    return new DomainEvent<T>(
      eventModel.name,
      eventModel.aggregateId,
      JSON.parse(eventModel.data),
      eventModel.id,
      eventModel.retries,
      eventModel.status as DomainEventStatus,
      eventModel.createdAt.toISOString(),
    );
  }
}
