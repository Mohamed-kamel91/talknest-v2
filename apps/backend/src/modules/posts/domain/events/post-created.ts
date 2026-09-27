import { DomainEvent } from '@talknest/core/domain';

export class PostCreated extends DomainEvent {
  static readonly eventName: string = 'PostCreated';

  constructor(postId: string, memberId: string) {
    super(PostCreated.eventName, postId, { postId, memberId });
  }
}
