import { type IUseCase } from '@talknest/core';
import { type IEventBus } from '@talknest/bus';
import { CastInitialUpvoteOnCommentCommand } from '@talknest/api/votes';
import { CommentVote } from '../../../domain/comment-vote';
import { ICommentVotesRepository } from '../../ports';
import { ICommentsRepository } from '../../../../comments/application/ports';

export class CastInitialUpvoteOnCommentUseCase implements IUseCase<
  CastInitialUpvoteOnCommentCommand,
  void
> {
  constructor(
    private readonly commentsRepository: ICommentsRepository,
    private readonly commentVotesRepository: ICommentVotesRepository,
    private readonly eventBus: IEventBus,
  ) {}

  async execute(command: CastInitialUpvoteOnCommentCommand) {
    // Usecase should be wrapped in a unit of work (transaction)
    // Event should saved in db (outbox pattern)
    const { commentId, memberId } = command.props;

    const existingVote = await this.commentVotesRepository.findByMemberAndCommentId(
      memberId,
      commentId,
    );

    if (existingVote) return;

    const commentVote = CommentVote.create({ memberId, commentId });

    const { scoreChange } = commentVote.castVote('upvote');

    await this.commentVotesRepository.save(commentVote);
    await this.commentsRepository.updateVoteScore(commentId, scoreChange);
    await this.eventBus.publishEvents(commentVote.getDomainEvents());
  }
}
