import { z } from 'zod';

export const postCommentInputSchema = z.object({
  postId: z
    .string({ error: 'Post ID is required' })
    .min(1, 'Post ID cannot be empty'),

  body: z
    .string({ error: 'Comment body is required' })
    .trim()
    .min(1, 'Comment body cannot be empty'),

  memberId: z
    .string('Member ID is required')
    .min(1, 'Member ID cannot be empty'),

  parentCommentId: z
    .string()
    .min(1, 'Parent comment ID cannot be empty')
    .optional(),
});

export type PostCommentInput = z.infer<typeof postCommentInputSchema>;
