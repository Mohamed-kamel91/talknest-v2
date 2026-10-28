import { v4 as uuidv4 } from 'uuid';

import { type DomainEvent } from '@talknest/core';

import type { PostVoteEventData } from './events/types';
import { PostUpvoted } from './events/post-upvoted';
import { PostDownvoted } from './events/post-downvoted';
import { PostUnvoted } from './events/post-unvoted';
import { VoteStatus } from './vote-status';
import { type VoteProps, Vote } from './vote';

interface PostVoteProps extends VoteProps {
  postId: string;
}

export class PostVote extends Vote<PostVoteProps> {
  private constructor(props: PostVoteProps) {
    super(props);
  }

  get postId(): string {
    return this.props.postId;
  }

  public static create(memberId: string, postId: string): PostVote {
    return new PostVote({
      id: uuidv4(),
      memberId: memberId,
      postId: postId,
      voteStatus: VoteStatus.unvoted(),
    });
  }

  public static reconstitute(props: PostVoteProps): PostVote {
    return new PostVote({ ...props });
  }

  protected createVoteChangeEvent(
    voteStatus: VoteStatus,
    scoreChange: number,
  ): DomainEvent<PostVoteEventData> {
    const eventData: PostVoteEventData = {
      voteId: this.id,
      memberId: this.memberId,
      postId: this.postId,
      scoreChange,
    };

    if (voteStatus.isUpvoted()) {
      return new PostUpvoted(eventData);
    }

    if (voteStatus.isDownvoted()) {
      return new PostDownvoted(eventData);
    }

    return new PostUnvoted(eventData);
  }
}
