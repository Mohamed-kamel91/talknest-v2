import { VoteOnPostCommand } from '@talknest/api/votes';
import { EventBus } from '@talknest/bus';
import { Result, success, UseCase } from '@talknest/core';
import { DatabaseError } from '@talknest/errors/server';

import { IMembersRepository } from '../../../../members/application/ports/members-repository';

import { PostVote } from '../../../domain/post-vote';
import { CanVoteOnPostPolicy } from '../../../domain/policies/can-vote-on-post';
import type { IPostsRepository } from '../../../../posts/application/ports/posts-repository';
import type { IVoteRepository } from '../../ports/vote-repository';

type VoteOnPostError = DatabaseError;

export class VoteOnPost implements UseCase<
  VoteOnPostCommand,
  Result<PostVote, VoteOnPostError>
> {
  constructor(
    private memberRepository: IMembersRepository,
    private postRepository: IPostsRepository,
    private voteRepository: IVoteRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    request: VoteOnPostCommand,
  ): Promise<Result<PostVote, VoteOnPostError>> {
    // implement
    throw new Error('Not yet implemented');
  }
}
