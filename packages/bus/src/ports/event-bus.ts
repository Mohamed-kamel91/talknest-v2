import { DomainEvent } from '@talknest/core';

export type EventHandler<T extends DomainEvent> = (event: T) => void;

export interface IEventBus {
  initialize(): Promise<any>;
  stop(): Promise<any>;
  publishEvents(events: readonly DomainEvent[]): Promise<void>;
  subscribe<T extends DomainEvent>(
    eventTypeName: string,
    handler: EventHandler<T>,
  ): void;
  unsubscribe<T extends DomainEvent>(
    eventTypeName: string,
    handler: EventHandler<T>,
  ): void;
}
