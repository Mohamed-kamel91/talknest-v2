import { UseCase, Result, success, fail } from '@talknest/core';
import { EventBus } from '@talknest/bus';
import { VoteOnCommentCommand } from '@talknest/api/votes';

import { CanVoteOnCommentPolicy } from '../../../domain/policies/can-vote-on-comment';

import { IMembersRepository } from '../../../../members/application/ports/members-repository';
import { IVoteRepository } from '../../ports/vote-repository';
import { CommentVote } from '../../../domain/comment-vote';
import { ICommentRepository } from '../../../../comments/application/ports/comment-repository';

type VoteOnCommentError = '';

export class VoteOnComment implements UseCase<
  VoteOnCommentCommand,
  Result<CommentVote, VoteOnCommentError>
> {
  constructor(
    private memberRepository: IMembersRepository,
    private commentRepo: ICommentRepository,
    private voteRepository: IVoteRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    request: VoteOnCommentCommand,
  ): Promise<Result<CommentVote, VoteOnCommentError>> {
    // implement
    throw new Error('Not yet implemented');
  }
}
