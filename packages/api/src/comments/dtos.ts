import { MemberDTO } from '../members';

// Comment DTO
export type CommentDTO = {
  id: string;
  body: string;
  postId: string;
  commentId: string;
  parentCommentId?: string;
  member: MemberDTO;
  points: number;
  childComments: CommentDTO[];
  createdAt: string;
};
