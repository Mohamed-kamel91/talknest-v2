import { CommentVote } from '../../domain/comment-vote';

export interface ICommentVotesRepository {
  findByMemberAndCommentId(memberId: string, commentId: string): Promise<CommentVote | null>;
  save(vote: CommentVote): Promise<void>;
}
