import {
  type IDatabase,
  Prisma,
  Post as PostModel,
  Member as MemberModel,
} from '@talknest/database';
import { DatabaseError } from '@talknest/errors/server';
import { GetPostsQuery } from '@talknest/api/posts';

import { Post } from '../../domain/post';

import { MemberReadModel } from '../../../members/application/read-models/member-read-model';
import { PostReadModel } from '../../application/read-models/post-read-model';
import type { IPostsRepository } from '../../application/ports/posts-repository';
import { PostMap } from '../../application/mappers/post-map';

type PostModelWithMember = PostModel & {
  memberPostedBy: MemberModel;
};

export class PrismaPostsRepository implements IPostsRepository {
  constructor(private database: IDatabase) {}

  async getById(id: string): Promise<Post | null> {
    const connection = this.database.getClient();
    const post = await connection.post.findUnique({
      where: { id },
      include: {
        memberPostedBy: true,
      },
    });

    if (!post) {
      return null;
    }

    return PostMap.toDomain(post);
  }

  async findPosts(query: GetPostsQuery): Promise<PostReadModel[]> {
    const connection = this.database.getClient();
    const sqlQuery = {
      orderBy: {},
      include: {
        memberPostedBy: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    };

    const { sort } = query.props;

    if (sort === 'popular') {
      sqlQuery.orderBy = { voteScore: 'desc' };
    }

    if (sort === 'recent') {
      sqlQuery.orderBy = { dateCreated: 'desc' };
    }

    // This should be done using projection and denormalized table "postReadModel"
    const posts = await connection.post.findMany(sqlQuery);

    return posts.map((post: PostModelWithMember) =>
      PostReadModel.fromPersistence(
        post,
        MemberReadModel.fromPersistence(post.memberPostedBy),
      ),
    );
  }

  public async getDetailsById(
    id: string,
  ): Promise<PostReadModel | null> {
    const connection = this.database.getClient();
    const post = await connection.post.findUnique({
      where: { id },
      include: {
        memberPostedBy: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!post) {
      return null;
    }

    const voteScore = await connection.postVote
      .aggregate({
        _sum: { value: true },
        where: { postId: id },
      })
      .then((result) => result._sum.value || 0);

    return PostReadModel.fromPersistence(
      { ...post, voteScore },
      MemberReadModel.fromPersistence(post.memberPostedBy),
    );
  }

  async save(
    post: Post,
    transaction?: Prisma.TransactionClient,
  ): Promise<void | DatabaseError> {
    const prismaInstance = transaction
      ? transaction
      : this.database.getClient();

    const postData = PostMap.toPersistence(post);

    try {
      await prismaInstance.post.upsert({
        where: { id: postData.id },
        update: {
          memberId: postData.memberId,
          postType: postData.postType,
          title: postData.title,
          content: postData.content,
          link: postData.link,
          voteScore: postData.voteScore,
          slug: postData.slug,
        },
        create: postData,
      });
    } catch (error) {
      console.log(error);
      throw new DatabaseError();
    }
  }

  async getBySlug(slug: string): Promise<PostReadModel | null> {
    const connection = this.database.getClient();
    const post = await connection.post.findFirst({
      where: { slug },
      include: {
        memberPostedBy: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });

    if (!post) return null;

    const member = MemberReadModel.fromPersistence(
      post.memberPostedBy,
    );

    return PostReadModel.fromPersistence(post, member);
  }
}
