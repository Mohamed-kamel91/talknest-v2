import { VoteOnPostCommand } from '@talknest/api/votes';
import { EventBus } from '@talknest/bus';
import { type Result, type IUseCase } from '@talknest/core';
import { DatabaseError } from '@talknest/errors/server';

import { IMembersRepository } from '../../../../members/application/ports/members-repository';

import { PostVote } from '../../../domain/post-vote';
import { CanVoteOnPostPolicy } from '../../../domain/policies/can-vote-on-post';
import type { IPostsRepository } from '../../../../posts/application/ports/posts-repository';
import type { IVoteRepository } from '../../ports/vote-repository';

export type VoteOnPostError = DatabaseError;
export type VoteOnPostResponse = Result<PostVote, VoteOnPostError>;

export class VoteOnPost implements IUseCase<
  VoteOnPostCommand,
  VoteOnPostResponse
> {
  constructor(
    private memberRepository: IMembersRepository,
    private postRepository: IPostsRepository,
    private voteRepository: IVoteRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    request: VoteOnPostCommand,
  ): Promise<VoteOnPostResponse> {
    // implement
    throw new Error('Not yet implemented');
  }
}
