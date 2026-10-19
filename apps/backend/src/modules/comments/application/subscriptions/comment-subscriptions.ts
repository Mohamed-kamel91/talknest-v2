import { type IEventBus } from '@talknest/bus';
import { type IEventSubscriptions } from '@talknest/core';

import { CommentPosted } from '../../domain/events/comment-posted';
import { CommentProjector } from '../projections/comment-projector';

export class CommentSubscriptions implements IEventSubscriptions {
  constructor(
    private eventBus: IEventBus,
    private commentProjector: CommentProjector,
  ) {}

  public register(): void {
    this.eventBus.subscribe<CommentPosted>(
      CommentPosted.eventName,
      this.onCommentPosted.bind(this),
    );
  }

  private async onCommentPosted(event: CommentPosted): Promise<void> {
    await this.commentProjector.projectComment(event.data.commentId);
  }
}
