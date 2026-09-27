import { PostDTO, PostType } from '@talknest/api/posts';
import { Post as PostModel } from '@talknest/database';

import { MemberReadModel } from '../../../members/application/read-models/member-read-model';

interface PostReadModelProps {
  id: string;
  title: string;
  content: string | undefined;
  link: string | undefined;
  member: MemberReadModel;
  numComments: number;
  voteScore: number;
  postType: PostType;
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export class PostReadModel {
  private props: PostReadModelProps;

  constructor(props: PostReadModelProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get slug(): string {
    return this.props.slug;
  }

  public static fromPersistence(
    prismaPost: PostModel & { _count?: { comments: number } },
    member: MemberReadModel,
  ): PostReadModel {
    return new PostReadModel({
      id: prismaPost.id,
      slug: prismaPost.slug,
      postType: prismaPost.postType as PostType,
      title: prismaPost.title,
      content: prismaPost.content ? prismaPost.content : undefined,
      link: prismaPost.link ? prismaPost.link : undefined,
      voteScore: prismaPost.voteScore,

      member: member,
      numComments: prismaPost._count?.comments ?? 0,
      createdAt: prismaPost.createdAt.toISOString(),
      updatedAt: prismaPost.updatedAt.toISOString(),
    });
  }

  public toDTO(): PostDTO {
    return {
      id: this.props.id,
      slug: this.props.slug,
      postType: this.props.postType,
      title: this.props.title,
      content: this.props.content,
      link: this.props.link,
      voteScore: this.props.voteScore,

      member: this.props.member.toDTO(),
      numComments: this.props.numComments,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
