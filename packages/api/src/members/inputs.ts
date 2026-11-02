import { z } from 'zod';

export const createMemberInputSchema = z.object({
  username: z.string({ error: 'Username is required' }).trim().min(1, 'Username cannot be empty'),
  userId: z.string({ error: 'User ID is required' }).trim().min(1, 'User ID cannot be empty'),
});

export type CreateMemberInput = z.infer<typeof createMemberInputSchema>;

export const updateReputationScoreInputSchema = z.object({
  memberId: z.string({ error: 'Member ID is required' }).min(1, 'Member ID cannot be empty'),
  scoreChange: z.number({ error: 'Score change is required' }),
});

export type updateReputationScoreInput = z.infer<typeof updateReputationScoreInputSchema>;
