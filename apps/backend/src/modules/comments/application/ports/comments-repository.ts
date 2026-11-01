import { Comment } from '../../domain/comment';

export interface ICommentsRepository {
  save(comment: Comment): Promise<void>;
  findById(id: string): Promise<Comment | null>;
  findByPostId(postId: string): Promise<Comment[]>;
  updateVoteScore(commentId: string, scoreChange: number): Promise<void>;
}
