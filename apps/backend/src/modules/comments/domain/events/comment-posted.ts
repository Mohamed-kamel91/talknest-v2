import { DomainEvent } from '@talknest/core/domain';

export class CommentPosted extends DomainEvent {
  static readonly eventName = 'CommentPosted';

  constructor(
    public readonly commentId: string,
    public readonly memberId: string,
    public readonly postId: string,
  ) {
    super(CommentPosted.eventName, commentId, {
      commentId,
      memberId,
      postId,
    });
  }
}
