import { IEventBus } from '@talknest/bus';
import { IEventSubscriptions } from '@talknest/core/application';
import { UpdateReputationScoreCommand } from '@talknest/api/members';

import {
  CommentDownvoted,
  CommentUnvoted,
  CommentUpvoted,
  PostDownvoted,
  PostUnvoted,
  PostUpvoted,
} from '../../../votes/domain/events';
import type { IPostsRepository } from '../../../posts/application/ports';
import type { ICommentsRepository } from '../../../comments/application/ports';

import { MembersService } from '../members-service';

export class VotesSubscriptions implements IEventSubscriptions {
  constructor(
    private readonly eventBus: IEventBus,
    private readonly membersService: MembersService,
    private readonly commentsRepository: ICommentsRepository,
    private readonly postsRepository: IPostsRepository,
  ) {}

  register() {
    this.eventBus.subscribe<PostUpvoted>(PostUpvoted.name, this.onPostVoteChanged.bind(this));
    this.eventBus.subscribe<PostDownvoted>(PostDownvoted.name, this.onPostVoteChanged.bind(this));
    this.eventBus.subscribe<PostUnvoted>(PostUnvoted.name, this.onPostVoteChanged.bind(this));

    this.eventBus.subscribe<CommentUpvoted>(
      CommentUpvoted.name,
      this.onCommentVoteChanged.bind(this),
    );
    this.eventBus.subscribe<CommentDownvoted>(
      CommentDownvoted.name,
      this.onCommentVoteChanged.bind(this),
    );
    this.eventBus.subscribe<CommentUnvoted>(
      CommentUnvoted.name,
      this.onCommentVoteChanged.bind(this),
    );
  }

  private async onPostVoteChanged(event: PostUpvoted | PostDownvoted | PostUnvoted) {
    const { postId, memberId: voterId, scoreChange } = event.data;

    const authorId = await this.postsRepository.findAuthorId(postId);
    if (!authorId || authorId === voterId) return; // votes on your own post don't count

    const command = new UpdateReputationScoreCommand({
      memberId: authorId,
      scoreChange,
    });

    await this.membersService.updateReputationScore(command);
  }

  private async onCommentVoteChanged(
    event: CommentUpvoted | CommentDownvoted | CommentUnvoted,
  ): Promise<void> {
    const { commentId, memberId: voterId, scoreChange } = event.data;

    const authorId = await this.commentsRepository.findAuthorId(commentId);
    if (!authorId || authorId === voterId) return; // votes on your own comment don't count

    const command = new UpdateReputationScoreCommand({
      memberId: authorId,
      scoreChange,
    });

    await this.membersService.updateReputationScore(command);
  }
}
