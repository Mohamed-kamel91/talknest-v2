import { ReputationLevel } from './types';

// DTOs
export type MemberDTO = {
  id: string;
  userId: string;
  username: string;
  reputationLevel: ReputationLevel;
  reputationScore: number;
};
