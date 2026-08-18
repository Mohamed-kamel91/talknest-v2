import {
  UpdateMemberReputationScoreCommand,
  VoteOnCommentCommand,
  VoteOnPostCommand,
} from '@talknest/api/votes';
import { EventBus } from '@talknest/bus';

import { UpdateMemberReputationScore } from './use-cases/update-member-reputation/update-member-reputation-score';
import { VoteOnPost } from './use-cases/vote-on-post/vote-on-post';
import { VoteOnComment } from './use-cases/vote-on-comment/vote-on-comment';

import { ICommentRepository } from '../../comments/repos/ports/comment-repository';
import { IMembersRepository } from '../../members/repos/ports/members-repository';
import { IPostsRepository } from '../../posts/repos/ports/posts-repository';
import { IVoteRepository } from '../repos/ports/vote-repository';

export class VotesService {
  constructor(
    private memberRepository: IMembersRepository,
    private commentRepository: ICommentRepository,
    private postRepository: IPostsRepository,
    private voteRepository: IVoteRepository,
    private eventBus: EventBus,
  ) {}

  castVoteOnPost(command: VoteOnPostCommand) {
    return new VoteOnPost(
      this.memberRepository,
      this.postRepository,
      this.voteRepository,
      this.eventBus,
    ).execute(command);
  }

  castVoteOnComment(command: VoteOnCommentCommand) {
    return new VoteOnComment(
      this.memberRepository,
      this.commentRepository,
      this.voteRepository,
      this.eventBus,
    ).execute(command);
  }

  updateMemberReputationScore(
    command: UpdateMemberReputationScoreCommand,
  ) {
    return new UpdateMemberReputationScore(
      this.memberRepository,
      this.voteRepository,
      this.eventBus,
    ).execute(command);
  }
}
