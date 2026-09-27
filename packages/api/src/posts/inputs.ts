import { z } from 'zod';

// Create Post
const basePostFields = {
  title: z
    .string({
      error: 'Title is required',
    })
    .min(1, 'Title cannot be empty'),
    
  memberId: z
    .string({
      error: 'Member ID is required',
    })
    .min(1, 'Member ID cannot be empty'),
};

export const TextPostSchema = z.object({
  ...basePostFields,

  content: z
    .string({
      error: 'Content is required',
    })
    .min(1, 'Content cannot be empty'),

  postType: z.literal('text', {
    error: 'Post type must be "text"',
  }),
});

export const LinkPostSchema = z.object({
  ...basePostFields,

  link: z
    .string({
      error: 'Link is required',
    })
    .min(1, 'Link cannot be empty'),

  postType: z.literal('link', {
    error: 'Post type must be "link"',
  }),
});

export const createPostInputSchema = z.discriminatedUnion(
  'postType',
  [TextPostSchema, LinkPostSchema],
  { error: 'Post type must be "text" or "link"' },
);

export type CreatePostInput = z.infer<typeof createPostInputSchema>;
export type PostTypeInput = CreatePostInput['postType'];

// Get Posts
export const getPostsQueryInputSchema = z.object({
  sort: z.enum(['popular', 'recent']),
});

export type GetPostsQueryInput = z.infer<
  typeof getPostsQueryInputSchema
>;

export type GetPostsQueryOption = z.infer<
  typeof getPostsQueryInputSchema.shape.sort
>;

// Get Post by id
export const getPostByIdQueryInputSchema = z.object({
  postId: z.string().min(1),
});

export type GetPostByIdQueryInput = z.infer<
  typeof getPostByIdQueryInputSchema
>;
