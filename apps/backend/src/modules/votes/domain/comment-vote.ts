import { v4 as uuidv4 } from 'uuid';

import { DomainEvent } from '@talknest/core/domain';

import type { CommentVoteEventData } from './events/types';
import { CommentUpvoted } from './events/comment-upvoted';
import { CommentDownvoted } from './events/comment-downvoted';
import { CommentUnvoted } from './events/comment-unvoted';
import { VoteStatus } from './vote-status';
import { Vote, type VoteProps } from './vote';

export type CreateCommentVoteProps = {
  memberId: string;
  commentId: string;
};

export interface CommentVoteProps extends VoteProps {
  commentId: string;
}

export class CommentVote extends Vote<CommentVoteProps> {
  private constructor(props: CommentVoteProps) {
    super(props);
  }

  get commentId(): string {
    return this.props.commentId;
  }

  public static create(props: CreateCommentVoteProps): CommentVote {
    return new CommentVote({
      id: uuidv4(),
      memberId: props.memberId,
      commentId: props.commentId,
      voteStatus: VoteStatus.unvoted(),
    });
  }

  public static reconstitute(props: CommentVoteProps): CommentVote {
    return new CommentVote({ ...props });
  }

  protected createVoteChangeEvent(
    voteStatus: VoteStatus,
    scoreChange: number,
  ): DomainEvent<CommentVoteEventData> {
    const eventData: CommentVoteEventData = {
      voteId: this.id,
      memberId: this.memberId,
      commentId: this.commentId,
      scoreChange,
    };

    if (voteStatus.isUpvoted()) {
      return new CommentUpvoted(eventData);
    } else if (voteStatus.isDownvoted()) {
      return new CommentDownvoted(eventData);
    } else {
      return new CommentUnvoted(eventData);
    }
  }
}
