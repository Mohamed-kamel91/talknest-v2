import { DomainEvent } from './domainEvent';

export abstract class AggregateRoot {
  private domainEvents: DomainEvent[] = [];

  public getDomainEvents(): readonly DomainEvent[] {
    return this.domainEvents;
  }

  public addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  public clearDomainEvents(): void {
    this.domainEvents = [];
  }
}
