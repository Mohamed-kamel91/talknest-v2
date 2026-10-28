import { CreatePostProps, Post } from '../../../src/modules/posts/domain/post';
import { PostContent } from '../../../src/modules/posts/domain/post-content';
import { PostTitle } from '../../../src/modules/posts/domain/post-title';
import { PostType } from '../../../src/modules/posts/domain/post-type';
import { InMemoryPostsRepository } from '../../../src/modules/posts/infra/repos';

import { CreatePostInputBuilder } from '../../builders/create-post-input-builder';

export function buildPost(overrides: Partial<CreatePostProps> = {}) {
  const input = CreatePostInputBuilder.aTextPost().build();

  return Post.create({
    memberId: input.memberId,
    title: PostTitle.create(input.title).getValue(),
    postType: PostType.create(input.postType).getValue(),
    content: PostContent.create(input.content).getValue(),
    ...overrides,
  }).getValue();
}

export function setupPostByRandomMember(
  postsRepositorySpy: InMemoryPostsRepository,
  overrides: Partial<CreatePostProps> = {},
) {
  const existingPost = buildPost(overrides);

  postsRepositorySpy.seedPosts([existingPost]);

  return existingPost;
}
