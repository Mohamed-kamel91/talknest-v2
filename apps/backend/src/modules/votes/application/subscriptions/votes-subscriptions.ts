import { type IEventSubscriptions } from '@talknest/core';
import { type IEventBus } from '@talknest/bus';
import {
  CastInitialUpvoteOnCommentCommand,
  CastInitialUpvoteOnPostCommand,
} from '@talknest/api/votes';

import { CommentPosted } from '../../../comments/domain/events/comment-posted';

import { VotesService } from '../votes-service';
import { PostCreated } from '../../../posts/domain/events/post-created';

export class VotesSubscriptions implements IEventSubscriptions {
  constructor(
    private readonly eventBus: IEventBus,
    private readonly votesService: VotesService,
  ) {}

  register() {
    this.eventBus.subscribe<CommentPosted>(
      CommentPosted.eventName,
      this.onCommentPosted.bind(this),
    );
    this.eventBus.subscribe<PostCreated>(PostCreated.eventName, this.onPostCreated.bind(this));
  }

  private async onPostCreated(event: PostCreated) {
    const { postId, memberId } = event.data;
    const command = new CastInitialUpvoteOnPostCommand({ postId, memberId });
    await this.votesService.CastInitialUpvoteOnPost(command);
  }

  private async onCommentPosted(event: CommentPosted) {
    const { commentId, memberId } = event.data;
    const command = new CastInitialUpvoteOnCommentCommand({ commentId, memberId });
    await this.votesService.CastInitialUpvoteOnComment(command);
  }
}
