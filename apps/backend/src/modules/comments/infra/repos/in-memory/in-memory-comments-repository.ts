import { Spy } from '../../../../../shared/test-doubles/spy';

import type { ICommentsRepository } from '../../../application/ports';
import { Comment } from '../../../domain/comment';

export class InMemoryCommentsRepository
  extends Spy<ICommentsRepository>
  implements ICommentsRepository
{
  private comments: Comment[] = [];

  // ---- Write side ----

  public async save(comment: Comment): Promise<void> {
    this.addCall('save', [comment]);

    const existingIndex = this.comments.findIndex((existing) => existing.id === comment.id);

    if (existingIndex !== -1) {
      this.comments[existingIndex] = comment; // upsert: update
    } else {
      this.comments.push(comment); // upsert: insert
    }
  }

  public async updateVoteScore(commentId: string, scoreChange: number): Promise<void> {
    const index = this.comments.findIndex((comment) => comment.id === commentId);
    if (index === -1) throw new Error(`Comment ${commentId} not found`);

    const comment = this.comments[index]!;

    this.comments[index] = Comment.reconstitute({
      id: comment.id,
      postId: comment.postId,
      body: comment.body,
      parentCommentId: comment.parentCommentId,
      memberId: comment.memberId,
      voteScore: comment.voteScore + scoreChange,
    });
  }

  // ---- Read side ----

  public async findById(id: string): Promise<Comment | null> {
    this.addCall('findById', [id]);
    const found = this.comments.find((comment) => comment.id === id);
    return found ?? null;
  }

  public async findByPostId(postId: string): Promise<Comment[]> {
    this.addCall('findByPostId', [postId]);

    return this.comments.filter((comment) => comment.postId === postId);
  }

  public async findAuthorId(commentId: string): Promise<string | null> {
    const comment = this.comments.find((comment) => comment.id === commentId);
    return comment?.memberId ?? null;
  }

  // ---- Test setup helpers ----

  public getAll(): Comment[] {
    return [...this.comments];
  }

  public seed(comments: Comment[]): void {
    this.comments.push(...comments);
  }

  public override reset(): void {
    super.reset();
    this.comments = [];
  }
}
