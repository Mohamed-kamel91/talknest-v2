import { Post } from '../../../src/modules/posts/domain/post';
import { PostContent } from '../../../src/modules/posts/domain/post-content';
import { PostTitle } from '../../../src/modules/posts/domain/post-title';
import { PostType } from '../../../src/modules/posts/domain/post-type';
import { InMemoryPostsRepository } from '../../../src/modules/posts/infra/repos/in-memory-posts-repository';
import { CreatePostInputBuilder } from '../../builders/create-post-input-builder';

export function buildPost() {
  const postInput = CreatePostInputBuilder.aTextPost().build();

  return Post.create({
    memberId: postInput.memberId,
    title: PostTitle.create(postInput.title).getValue(),
    postType: PostType.create(postInput.postType).getValue(),
    content: PostContent.create(postInput.content).getValue(),
  }).getValue();
}

export function setupPostByRandomMember(
  postsRepositorySpy: InMemoryPostsRepository,
) {
  const existingPost = buildPost();

  postsRepositorySpy.seedPosts([existingPost]);

  return existingPost;
}
