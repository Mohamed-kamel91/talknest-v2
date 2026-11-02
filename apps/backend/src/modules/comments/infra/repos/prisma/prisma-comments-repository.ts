import { IDatabase, Prisma } from '@talknest/database';
import { ICommentsRepository } from '../../../application/ports';
import { Comment } from '../../../domain/comment';
import { commentMap } from '../../mappers';

export class PrismaCommentsRepository implements ICommentsRepository {
  constructor(private database: IDatabase) {}

  public async save(comment: Comment, transaction?: Prisma.TransactionClient) {
    const prismaInstance = transaction || this.database.getClient();

    const commentData = commentMap.toPersistence(comment);

    try {
      await prismaInstance.comment.upsert({
        where: { id: commentData.id },
        update: commentData,
        create: commentData,
      });
    } catch (err) {
      console.log(err);
      throw new Error('Database exception', { cause: err });
    }
  }

  public async findById(id: string): Promise<Comment | null> {
    const connection = this.database.getClient();

    const comment = await connection.comment.findUnique({
      where: { id },
    });

    if (!comment) return null;

    return commentMap.toDomain(comment);
  }

  public async findByPostId(postId: string): Promise<Comment[]> {
    return [];
  }

  async findAuthorId(commentId: string) {
    const row = await this.database.getClient().comment.findUnique({
      where: { id: commentId },
      select: { memberId: true },
    });
    return row?.memberId ?? null;
  }
  
  public async updateVoteScore(commentId: string, scoreChange: number): Promise<void> {
    const client = this.database.getClient();

    await client.comment.update({
      where: { id: commentId },
      data: { voteScore: { increment: scoreChange } },
    });
  }

}
