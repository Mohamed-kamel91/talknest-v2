import { Prisma, type IDatabase } from '@talknest/database';

import type { ICommentVotesRepository } from '../../../application/ports';
import { CommentVote } from '../../../domain/comment-vote';
import { CommentVoteMap } from '../../mappers/comment-vote-map';

export class PrismaCommentVotesRepository implements ICommentVotesRepository {
  constructor(private database: IDatabase) {}

  async findByMemberAndCommentId(memberId: string, commentId: string): Promise<CommentVote | null> {
    const connection = this.database.getClient();
    const vote = await connection.commentVote.findUnique({
      where: {
        memberId_commentId: {
          memberId,
          commentId,
        },
      },
    });

    if (!vote) return null;

    return CommentVoteMap.toDomain(vote);
  }

  public async save(vote: CommentVote, transaction?: Prisma.TransactionClient): Promise<void> {
    const client = transaction ?? this.database.getClient();

    await client.commentVote.upsert({
      where: {
        memberId_commentId: {
          memberId: vote.memberId,
          commentId: vote.commentId,
        },
      },
      update: { value: vote.getValue() },
      create: {
        memberId: vote.memberId,
        commentId: vote.commentId,
        value: vote.getValue(),
      },
    });
  }
}
