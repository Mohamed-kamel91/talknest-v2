import { Comment } from '../../domain/comment';

export interface ICommentsRepository {
  save(comment: Comment): Promise<void>;
  getById(id: string): Promise<Comment | null>;
  findByPostId(postId: string): Promise<Comment[]>;
}
