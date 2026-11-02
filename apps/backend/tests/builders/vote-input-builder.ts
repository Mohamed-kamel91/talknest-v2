import { faker } from '@faker-js/faker';

import { type VoteType, type VoteOnPostInput, type VoteOnCommentInput } from '@talknest/api/votes';

type BaseVoteInput = Pick<VoteOnPostInput & VoteOnCommentInput, 'memberId' | 'voteType'>;

export abstract class BaseVoteInputBuilder<TInput extends BaseVoteInput> {
  protected memberId: string = faker.string.uuid();
  protected voteType: VoteType = 'upvote';

  protected abstract buildTarget(): Omit<TInput, keyof BaseVoteInput>;

  public withMemberId(id: string): this {
    this.memberId = id;
    return this;
  }
  public withVoteType(type: VoteType): this {
    this.voteType = type;
    return this;
  }

  public asUpvote(): this {
    return this.withVoteType('upvote');
  }

  public asDownvote(): this {
    return this.withVoteType('downvote');
  }

  public build(): TInput {
    return {
      memberId: this.memberId,
      voteType: this.voteType,
      ...this.buildTarget(),
    } as TInput;
  }
}

export class PostVoteInputBuilder extends BaseVoteInputBuilder<VoteOnPostInput> {
  private postId: string = faker.string.uuid();

  public withPostId(id: string): this {
    this.postId = id;
    return this;
  }

  public buildTarget(): Pick<VoteOnPostInput, 'postId'> {
    return { postId: this.postId };
  }
}

export class CommentVoteInputBuilder extends BaseVoteInputBuilder<VoteOnCommentInput> {
  private commentId: string = faker.string.uuid();

  public withCommentId(id: string): this {
    this.commentId = id;
    return this;
  }

  public buildTarget(): Pick<VoteOnCommentInput, 'commentId'> {
    return { commentId: this.commentId };
  }
}

export const aCommentVote = () => new CommentVoteInputBuilder();
export const aPostVote = () => new PostVoteInputBuilder();
