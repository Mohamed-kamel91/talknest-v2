import { v4 as uuidv4 } from 'uuid';

import { AggregateRoot } from '@talknest/core/domain';

import { CommentPosted } from './events/comment-posted';
import { CommentBody } from './comment-body';

export interface CommentProps {
  id: string;
  postId: string;
  body: CommentBody;
  memberId: string;
  parentCommentId?: string | undefined;
  voteScore: number;
  createdAt: Date;
}

type CreateCommentProps = {
  postId: string;
  body: CommentBody;
  memberId: string;
  parentCommentId?: string | undefined;
};

export class Comment extends AggregateRoot {
  private constructor(private props: CommentProps) {
    super();
  }

  get id() {
    return this.props.id;
  }

  get postId() {
    return this.props.postId;
  }

  get body() {
    return this.props.body;
  }

  get parentCommentId() {
    return this.props.parentCommentId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get voteScore() {
    return this.props.voteScore;
  }

  get memberId() {
    return this.props.memberId;
  }

  public static create(props: CreateCommentProps): Comment {
    const comment = new Comment({
      id: uuidv4(),
      body: props.body,
      memberId: props.memberId,
      postId: props.postId,
      parentCommentId: props.parentCommentId,
      voteScore: 0,
      createdAt: new Date(),
    });

    comment.addDomainEvent(
      new CommentPosted({
        commentId: comment.id,
        memberId: comment.memberId,
        postId: comment.postId,
      }),
    );

    return comment;
  }

  public static reconstitute(props: CommentProps): Comment {
    return new Comment({ ...props });
  }
}
