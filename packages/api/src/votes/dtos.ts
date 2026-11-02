import { VoteStatus } from './types';

export type VoteOnPostDTO = {
  postId: string;
  voteStatus: VoteStatus;
};

export type VoteOnCommentDTO = {
  commentId: string;
  voteStatus: VoteStatus;
};
