import { type IDatabase } from '@talknest/database';

import type { ICommentVotesReadRepository } from '../../../application/ports';
import { MemberCommentVotesRoundup } from '../../../application/read-models';

export class PrismaCommentVotesReadRepository implements ICommentVotesReadRepository {
  constructor(private database: IDatabase) {}

  async getMemberCommentVotesRoundup(memberId: string): Promise<MemberCommentVotesRoundup> {
    const connection = this.database.getClient();

    const [allCommentsCount, upvotesCount, downvotesCount] = await Promise.all([
      connection.commentVote.count({
        where: { memberId },
      }),
      connection.commentVote.count({
        where: { comment: { memberId }, value: 1 },
      }),
      connection.commentVote.count({
        where: { comment: { memberId }, value: -1 },
      }),
    ]);

    const roundup = MemberCommentVotesRoundup.toDomain({
      memberId,
      allCommentsCount,
      upvotesCount,
      downvotesCount,
    });

    return roundup;
  }
}
