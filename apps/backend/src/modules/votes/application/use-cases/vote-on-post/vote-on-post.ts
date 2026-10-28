import { VoteOnPostCommand } from '@talknest/api/votes';
import { type IEventBus } from '@talknest/bus';
import { type Result, type IUseCase } from '@talknest/core';
import { DatabaseError } from '@talknest/errors/server';

import { IMembersRepository } from '../../../../members/application/ports/members-repository';
import type { IPostsRepository } from '../../../../posts/application/ports/posts-repository';

import type { IPostVotesRepository } from '../../ports/post-votes-repository';
import { CanVoteOnPostPolicy } from '../../../domain/policies/can-vote-on-post';
import { PostVote } from '../../../domain/post-vote';

export type VoteOnPostError = DatabaseError;
export type VoteOnPostResponse = Result<PostVote, VoteOnPostError>;

export class VoteOnPostUseCase implements IUseCase<VoteOnPostCommand, VoteOnPostResponse> {
  constructor(
    private readonly membersRepository: IMembersRepository,
    private readonly postsRepository: IPostsRepository,
    private readonly postVotesRepository: IPostVotesRepository,
    private readonly eventBus: IEventBus,
  ) {}

  async execute(request: VoteOnPostCommand): Promise<VoteOnPostResponse> {
    // implement
    throw new Error('Not yet implemented');
  }
}
