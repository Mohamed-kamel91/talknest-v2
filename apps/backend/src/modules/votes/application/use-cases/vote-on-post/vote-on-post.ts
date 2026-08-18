import { DatabaseError } from '@talknest/errors/server';
import { Result, success, UseCase } from '@talknest/core';
import { VoteOnPostCommand } from '@talknest/api/votes';
import { EventBus } from '@talknest/bus';

import { IMembersRepository } from '../../../../members/repos/ports/members-repository';

import { PostVote } from '../../../domain/post-vote';
import { CanVoteOnPostPolicy } from './can-vote-on-post';
import { IPostsRepository } from '../../../../posts/repos/ports/posts-repository';
import { IVoteRepository } from '../../../repos/ports/vote-repository';

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
