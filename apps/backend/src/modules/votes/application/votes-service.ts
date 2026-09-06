import {
  UpdateMemberReputationScoreCommand,
  VoteOnCommentCommand,
  VoteOnPostCommand,
} from '@talknest/api/votes';
import { EventBus } from '@talknest/bus';

import type { ICommentRepository } from '../../comments/application/ports/comment-repository';
import type { IMembersRepository } from '../../members/application/ports/members-repository';
import type { IPostsRepository } from '../../posts/application/ports/posts-repository';

import {
  UpdateMemberReputationResponse,
  UpdateMemberReputationScore,
} from './use-cases/update-member-reputation/update-member-reputation-score';
import {
  VoteOnPost,
  VoteOnPostResponse,
} from './use-cases/vote-on-post/vote-on-post';
import {
  VoteOnComment,
  VoteOnCommentResponse,
} from './use-cases/vote-on-comment/vote-on-comment';
import type { IVoteRepository } from './ports/vote-repository';

export class VotesService {
  constructor(
    private memberRepository: IMembersRepository,
    private commentRepository: ICommentRepository,
    private postRepository: IPostsRepository,
    private voteRepository: IVoteRepository,
    private eventBus: EventBus,
  ) {}

  castVoteOnPost(
    command: VoteOnPostCommand,
  ): Promise<VoteOnPostResponse> {
    return new VoteOnPost(
      this.memberRepository,
      this.postRepository,
      this.voteRepository,
      this.eventBus,
    ).execute(command);
  }

  castVoteOnComment(
    command: VoteOnCommentCommand,
  ): Promise<VoteOnCommentResponse> {
    return new VoteOnComment(
      this.memberRepository,
      this.commentRepository,
      this.voteRepository,
      this.eventBus,
    ).execute(command);
  }

  updateMemberReputationScore(
    command: UpdateMemberReputationScoreCommand,
  ): Promise<UpdateMemberReputationResponse> {
    return new UpdateMemberReputationScore(
      this.memberRepository,
      this.voteRepository,
      this.eventBus,
    ).execute(command);
  }
}
