import { IEventSubscriptions } from '@talknest/core';
import { type IEventBus } from '@talknest/bus';
import {
  UpdateMemberReputationScoreCommand,
  VoteOnCommentCommand,
  VoteOnPostCommand,
} from '@talknest/api/votes';

import { CommentPosted } from '../../../comments/domain/events/comment-posted';

import {
  PostDownvoted,
  PostUpvoted,
  PostUnvoted,
  CommentUpvoted,
  CommentDownvoted,
  CommentUnvoted,
} from '../../domain/events';
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

    this.eventBus.subscribe<PostUpvoted>(
      PostUpvoted.name,
      this.onPostOrCommentVoteChanged.bind(this),
    );
    this.eventBus.subscribe<PostDownvoted>(
      PostDownvoted.name,
      this.onPostOrCommentVoteChanged.bind(this),
    );
    this.eventBus.subscribe<PostUnvoted>(
      PostUnvoted.name,
      this.onPostOrCommentVoteChanged.bind(this),
    );

    this.eventBus.subscribe<CommentUpvoted>(
      CommentUpvoted.name,
      this.onPostOrCommentVoteChanged.bind(this),
    );
    this.eventBus.subscribe<CommentDownvoted>(
      CommentDownvoted.name,
      this.onPostOrCommentVoteChanged.bind(this),
    );
    this.eventBus.subscribe<CommentUnvoted>(
      CommentUnvoted.name,
      this.onPostOrCommentVoteChanged.bind(this),
    );
  }

  private async onPostCreated(event: PostCreated) {
    const { postId, memberId } = event.data;

    const command = VoteOnPostCommand.create({ postId, memberId, voteType: 'upvote' });
    if (command.isFailure) {
      console.error('Failed to cast initial upvote on post', {
        postId,
        memberId,
        error: command.getError().message,
      });
      return;
    }

    await this.votesService.CastInitialUpvoteOnPost(command.getValue());
  }

  private async onCommentPosted(event: CommentPosted) {
    const { commentId, memberId } = event.data;

    const command = VoteOnCommentCommand.create({ commentId, memberId, voteType: 'upvote' });
    if (command.isFailure) {
      console.error('Failed to cast initial upvote on comment', {
        commentId,
        memberId,
        error: command.getError().message,
      });
      return;
    }

    await this.votesService.CastInitialUpvoteOnComment(command.getValue());
  }

  private async onPostOrCommentVoteChanged(
    event: PostUpvoted | PostDownvoted | CommentUpvoted | CommentDownvoted,
  ) {
    try {
      console.log('updating member reputation score based on post vote');
      const command = new UpdateMemberReputationScoreCommand({
        memberId: event.data.memberId,
      });
      const response = await this.votesService.updateMemberReputationScore(command);
      // If not successful, handle.
    } catch (error) {
      console.log(error);
      // Handle
    }
  }
}
