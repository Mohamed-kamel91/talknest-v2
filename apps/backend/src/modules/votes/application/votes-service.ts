import { type IEventBus } from '@talknest/bus';
import {
  VoteOnCommentCommand,
  VoteOnPostCommand,
  CastInitialUpvoteOnCommentCommand,
  CastInitialUpvoteOnPostCommand,
} from '@talknest/api/votes';

import type { ICommentsRepository } from '../../comments/application/ports';
import type { IMembersRepository } from '../../members/application/ports';
import type { IPostsRepository } from '../../posts/application/ports';

import type { ICommentVotesRepository, IPostVotesRepository } from './ports';
import {
  VoteOnCommentUseCase,
  VoteOnPostUseCase,
  CastInitialUpvoteOnCommentUseCase,
  CastInitialUpvoteOnPostUseCase,
} from './use-cases/';

export class VotesService {
  constructor(
    private membersRepository: IMembersRepository,
    private commentsRepository: ICommentsRepository,
    private postsRepository: IPostsRepository,
    private postVotesRepository: IPostVotesRepository,
    private commentVotesRepository: ICommentVotesRepository,
    private eventBus: IEventBus,
  ) {}

  public voteOnPost(command: VoteOnPostCommand) {
    return new VoteOnPostUseCase(
      this.membersRepository,
      this.postsRepository,
      this.postVotesRepository,
      this.eventBus,
    ).execute(command);
  }

  public voteOnComment(command: VoteOnCommentCommand) {
    return new VoteOnCommentUseCase(
      this.membersRepository,
      this.commentsRepository,
      this.commentVotesRepository,
      this.eventBus,
    ).execute(command);
  }

  public CastInitialUpvoteOnComment(command: CastInitialUpvoteOnCommentCommand) {
    return new CastInitialUpvoteOnCommentUseCase(
      this.commentsRepository,
      this.commentVotesRepository,
      this.eventBus,
    ).execute(command);
  }

  public CastInitialUpvoteOnPost(command: CastInitialUpvoteOnPostCommand) {
    return new CastInitialUpvoteOnPostUseCase(
      this.postsRepository,
      this.postVotesRepository,
      this.eventBus,
    ).execute(command);
  }
}
