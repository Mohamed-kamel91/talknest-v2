import { type IUseCase, type Result } from '@talknest/core';
import { EventBus } from '@talknest/bus';
import { VoteOnCommentCommand } from '@talknest/api/votes';

import type { IMembersRepository } from '../../../../members/application/ports/members-repository';
import type { ICommentRepository } from '../../../../comments/application/ports/comment-repository';

import { CanVoteOnCommentPolicy } from '../../../domain/policies/can-vote-on-comment';
import type { IVoteRepository } from '../../ports/vote-repository';
import { CommentVote } from '../../../domain/comment-vote';

export type VoteOnCommentError = '';
export type VoteOnCommentResponse = Result<
  CommentVote,
  VoteOnCommentError
>;

export class VoteOnComment implements IUseCase<
  VoteOnCommentCommand,
  VoteOnCommentResponse
> {
  constructor(
    private memberRepository: IMembersRepository,
    private commentRepo: ICommentRepository,
    private voteRepository: IVoteRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    request: VoteOnCommentCommand,
  ): Promise<VoteOnCommentResponse> {
    // implement
    throw new Error('Not yet implemented');
  }
}
