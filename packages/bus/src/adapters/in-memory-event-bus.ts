import { DomainEvent } from '@talknest/core';
import type { EventHandler, IEventBus } from '../ports/event-bus';

export class InMemoryEventBus implements IEventBus {
  private subscriptions: Map<
    string,
    Array<EventHandler<DomainEvent>>
  > = new Map();

  async initialize(): Promise<any> {
    // No-op
  }

  async stop(): Promise<any> {
    // No-op
  }

  public async publishEvents(events: DomainEvent[]): Promise<void> {
    events.forEach((event) => {
      const eventType = event.constructor.name;
      const handlers = this.subscriptions.get(eventType);

      if (handlers) {
        console.log(`Publishing event: ${eventType}`);
        handlers.forEach((handler) => handler(event));
      }
    });
  }

  public subscribe<T extends DomainEvent>(
    eventTypeName: string,
    handler: EventHandler<T>,
  ): void {
    const handlers = this.subscriptions.get(eventTypeName) || [];
    handlers.push(handler as EventHandler<DomainEvent>);
    this.subscriptions.set(eventTypeName, handlers);
  }

  public async unsubscribe<T extends DomainEvent>(
    eventTypeName: string,
    handler: EventHandler<T>,
  ): Promise<void> {
    const handlers = this.subscriptions.get(eventTypeName);

    if (handlers) {
      const index = handlers.indexOf(
        handler as EventHandler<DomainEvent>,
      );
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }
}
