import { Prisma, type IDatabase } from '@talknest/database';

import type { IPostVotesRepository } from '../../../application/ports';
import { PostVote } from '../../../domain/post-vote';
import { PostVoteMap } from '../../mappers/post-vote-map';

export class PrismaPostVotesRepository implements IPostVotesRepository {
  constructor(private database: IDatabase) {}

  async findByMemberAndPostId(memberId: string, postId: string): Promise<PostVote | null> {
    const connection = this.database.getClient();
    const vote = await connection.postVote.findUnique({
      where: {
        memberId_postId: {
          memberId,
          postId,
        },
      },
    });

    if (!vote) return null;

    return PostVoteMap.toDomain(vote);
  }

  public async save(vote: PostVote, transaction?: Prisma.TransactionClient): Promise<void> {
    const client = transaction ?? this.database.getClient();

    await client.postVote.upsert({
      where: {
        memberId_postId: {
          memberId: vote.memberId,
          postId: vote.postId,
        },
      },
      update: { value: vote.getValue() },
      create: {
        memberId: vote.memberId,
        postId: vote.postId,
        value: vote.getValue(),
      },
    });
  }
}
