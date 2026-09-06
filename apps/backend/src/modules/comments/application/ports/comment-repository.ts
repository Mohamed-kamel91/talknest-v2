import { Comment } from '../../domain/comment';

// Not yet used.

export interface ICommentRepository {
  save(comment: Comment): Promise<void>;
  getCommentById(id: string): Promise<Comment | null>;
  getCommentsByPostId(postId: string): Promise<Comment[]>;
}
