import { success, fail, type IUseCase, type Result } from '@talknest/core';
import { type IEventBus } from '@talknest/bus';
import { VoteOnCommentCommand } from '@talknest/api/votes';

import type { IMembersRepository } from '../../../../members/application/ports/members-repository';
import type { ICommentsRepository } from '../../../../comments/application/ports/comments-repository';
import { CommentNotFoundError } from '../../../../comments/domain/errors/comment-errors';
import {
  InsufficientMemberLevelError,
  MemberNotFoundError,
} from '../../../../members/domain/errors/member-errors';

import type { ICommentVotesRepository } from '../../ports/';
import { CanVoteOnCommentPolicy } from '../../../domain/policies/can-vote-on-comment';
import { CommentVote } from '../../../domain/comment-vote';

export type VoteOnCommentError =
  CommentNotFoundError | MemberNotFoundError | InsufficientMemberLevelError;

export type VoteOnCommentResponse = Result<CommentVote, VoteOnCommentError>;

export class VoteOnCommentUseCase implements IUseCase<VoteOnCommentCommand, VoteOnCommentResponse> {
  constructor(
    private membersRepository: IMembersRepository,
    private commentsRepository: ICommentsRepository,
    private commentVotesRepository: ICommentVotesRepository,
    private eventBus: IEventBus,
  ) {}

  async execute(command: VoteOnCommentCommand): Promise<VoteOnCommentResponse> {
    const { commentId, memberId, voteType } = command.props;

    const [member, comment, existingVote] = await Promise.all([
      this.membersRepository.getById(memberId),
      this.commentsRepository.getById(commentId),
      this.commentVotesRepository.findByMemberAndCommentId(memberId, commentId),
    ]);

    if (!member) return fail(new MemberNotFoundError());
    if (!comment) return fail(new CommentNotFoundError());

    const policyResult = CanVoteOnCommentPolicy.check(member, comment);
    if (policyResult.isFailure) {
      return fail(policyResult.getError());
    }

    const commentVote = existingVote ?? CommentVote.create({ memberId, commentId });

    commentVote.castVote(voteType);

    await this.commentVotesRepository.save(commentVote);
    // await this.commentsRepository.updateVoteScore(commentId, scoreChange);
    await this.eventBus.publishEvents(commentVote.getDomainEvents());

    return success(commentVote);
  }
}
