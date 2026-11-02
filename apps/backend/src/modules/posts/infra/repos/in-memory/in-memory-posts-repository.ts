import { type GetPostsQuery } from '@talknest/api/posts';

import { Spy } from '../../../../../shared/test-doubles/spy';

import { type PostReadModel } from '../../../application/read-models/post-read-model';
import { Post } from '../../../domain/post';
import { IPostsRepository } from '../../../application/ports/posts-repository';

export class InMemoryPostsRepository extends Spy<IPostsRepository> implements IPostsRepository {
  private posts: Post[] = [];
  private readModels: PostReadModel[] = [];

  // ---- Write side ----

  public async save(post: Post): Promise<void> {
    this.addCall('save', [post]);

    const existingIndex = this.posts.findIndex((p) => p.id === post.id);

    if (existingIndex >= 0) {
      this.posts[existingIndex] = post;
    } else {
      this.posts.push(post);
    }
  }

  async updateVoteScore(postId: string, scoreChange: number): Promise<void> {
    const index = this.posts.findIndex((post) => post.id === postId);
    if (index === -1) throw new Error(`Comment ${postId} not found`);

    const post = this.posts[index]!;
    const voteScore = post.voteScore + scoreChange;

    const base = {
      id: post.id,
      memberId: post.memberId,
      slug: post.slug,
      title: post.title,
      voteScore,
    };

    this.posts[index] =
      post.postType === 'link'
        ? Post.reconstitute({ ...base, postType: 'link', link: post.link })
        : Post.reconstitute({ ...base, postType: 'text', content: post.content });
  }

  // ---- Read side ----

  public async findById(id: string): Promise<Post | null> {
    this.addCall('findById', [id]);
    return this.posts.find((post) => post.id === id) ?? null;
  }

  public async findPosts(query: GetPostsQuery): Promise<PostReadModel[]> {
    this.addCall('findPosts', [query]);
    return this.readModels;
  }

  public async getDetailsById(id: string): Promise<PostReadModel | null> {
    this.addCall('getDetailsById', [id]);
    return this.readModels.find((post) => post.id === id) ?? null;
  }

  public async getBySlug(slug: string): Promise<PostReadModel | null> {
    this.addCall('getBySlug', [slug]);
    return this.readModels.find((post) => post.slug === slug) ?? null;
  }

  public async findAuthorId(postId: string): Promise<string | null> {
    const post = this.posts.find((post) => post.id === postId);
    return post?.memberId ?? null;
  }

  // ---- Test setup helpers ----

  public seed(posts: Post[]): void {
    this.posts.push(...posts);
  }

  public seedReadModels(readModels: PostReadModel[]): void {
    this.readModels.push(...readModels);
  }

  public async reset(): Promise<void> {
    this.posts = [];
    this.readModels = [];
    this.calls = [];
  }
}
