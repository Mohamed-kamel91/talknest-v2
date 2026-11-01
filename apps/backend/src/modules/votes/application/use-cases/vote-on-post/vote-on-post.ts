import { type Result, type IUseCase, success } from '@talknest/core';
import { type IEventBus } from '@talknest/bus';
import { VoteOnPostCommand } from '@talknest/api/votes';

import type { IMembersRepository } from '../../../../members/application/ports';
import type { IPostsRepository } from '../../../../posts/application/ports';
import {
  InsufficientMemberLevelError,
  MemberNotFoundError,
} from '../../../../members/domain/errors/member-errors';

import type { IPostVotesRepository } from '../../ports';
import { PostNotFoundError } from '../../../../posts/domain/errors/posts-errors';
import { CanVoteOnPostPolicy } from '../../../domain/policies/can-vote-on-post';
import { PostVote } from '../../../domain/post-vote';

export type VoteOnPostError =
  PostNotFoundError | MemberNotFoundError | InsufficientMemberLevelError;
export type VoteOnPostResponse = Result<PostVote, VoteOnPostError>;

export class VoteOnPostUseCase implements IUseCase<VoteOnPostCommand, VoteOnPostResponse> {
  constructor(
    private readonly membersRepository: IMembersRepository,
    private readonly postsRepository: IPostsRepository,
    private readonly postVotesRepository: IPostVotesRepository,
    private readonly eventBus: IEventBus,
  ) {}

  async execute(command: VoteOnPostCommand): Promise<VoteOnPostResponse> {
    const { postId, memberId, voteType } = command.props;

    const [member, post] = await Promise.all([
      this.membersRepository.findById(memberId),
      this.postsRepository.findById(postId),
    ]);

    if (!member) return fail(new MemberNotFoundError());
    if (!post) return fail(new PostNotFoundError());

    const policyResult = CanVoteOnPostPolicy.check(member, post);
    if (policyResult.isFailure) {
      return fail(policyResult.getError());
    }

    // From here it should be wrapped in a unit of work (transaction)
    const existingVote = await this.postVotesRepository.findByMemberAndPostId(memberId, postId);

    const postVote = existingVote ?? PostVote.create({ memberId, postId });

    const { scoreChange } = postVote.castVote(voteType);

    await this.postVotesRepository.save(postVote);
    await this.postsRepository.updateVoteScore(postId, scoreChange);
    await this.eventBus.publishEvents(postVote.getDomainEvents());

    return success(postVote);
  }
}
