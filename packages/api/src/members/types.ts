// Reputation
export const reputationLevel = {
  Level1: 'Level1',
  Level2: 'Level2',
  Level3: 'Level3',
} as const;

export type ReputationLevel =
  (typeof reputationLevel)[keyof typeof reputationLevel];
