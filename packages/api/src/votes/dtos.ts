import { VoteType } from './types';

// DTOs
export type PostVoteDTO = {
  postId: string;
  memberId: string;
  voteType: VoteType;
};
