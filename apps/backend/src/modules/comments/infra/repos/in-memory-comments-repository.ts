import { Spy } from '../../../../shared/test-doubles/spy';
import { ICommentsRepository } from '../../application/ports/comments-repository';
import { Comment } from '../../domain/comment';

export class InMemoryCommentsRepository
  extends Spy<ICommentsRepository>
  implements ICommentsRepository
{
  private comments: Comment[] = [];

  async save(comment: Comment): Promise<void> {
    this.addCall('save', [comment]);

    const existingIndex = this.comments.findIndex(
      (existing) => existing.id === comment.id,
    );

    if (existingIndex !== -1) {
      this.comments[existingIndex] = comment; // upsert: update
    } else {
      this.comments.push(comment); // upsert: insert
    }
  }

  async getById(id: string): Promise<Comment | null> {
    this.addCall('getById', [id]);

    const found = this.comments.find((comment) => comment.id === id);

    return found ?? null;
  }

  async findByPostId(postId: string): Promise<Comment[]> {
    this.addCall('findByPostId', [postId]);

    return this.comments.filter(
      (comment) => comment.postId === postId,
    );
  }

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
