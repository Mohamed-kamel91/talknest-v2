import { ReputationLevel } from './types';

// DTOs
export type MemberDTO = {
  userId: string;
  memberId: string;
  username: string;
  reputationLevel: ReputationLevel;
  reputationScore: number;
};
