import { type PostDTO } from '@talknest/api/posts';
import { type PrismaClient } from '@talknest/database';

import { type IPostRepo } from '../ports/post-repo';
import { type getPostsQuery } from '../post-query';

export class PrismaPostRepo implements IPostRepo {
  constructor(private prisma: PrismaClient) {}

  public async getAll(query: getPostsQuery): Promise<PostDTO[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        votes: true, // Include associated votes for each post
        memberPostedBy: {
          include: {
            user: true,
          },
        },
        comments: true,
      },
      orderBy: {
        dateCreated: query.sort === 'recent' ? 'desc' : 'asc', // Sorts by dateCreated in descending order
      },
    });

    const formattedPosts = posts.map((post) => this.formatPost(post));
    return formattedPosts;
  }

  private formatPost(post: any): PostDTO {
    return {
      id: post.id,
      memberId: post.memberId,
      postType: post.postType,
      title: post.title,
      content: post.content,
      dateCreated: post.dateCreated.toISOString(),
      memberPostedBy: {
        user: {
          id: post.memberPostedBy.id,
          email: post.memberPostedBy.user.email,
          username: post.memberPostedBy.user.username,
          firstName: post.memberPostedBy.user.firstName,
          lastName: post.memberPostedBy.user.lastName,
        },
      },
      votes: post.votes,
      comments: post.comments,
    };
  }
}
