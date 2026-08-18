import { PostDTO, PostType } from '@talknest/api/posts';
import { Post as PostModel } from '@talknest/database';

import { MemberReadModel } from '../../members/domain/member-read-model';

interface PostReadModelProps {
  id: string;
  title: string;
  content: string | undefined;
  link: string | undefined;
  member: MemberReadModel;
  numComments: number;
  voteScore: number;
  postType: PostType;
  dateCreated: string;
  lastUpdated: string;
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

  public static fromPrismaToDomain(
    prismaPost: PostModel & { _count?: { comments: number } },
    member: MemberReadModel,
  ): PostReadModel {
    return new PostReadModel({
      id: prismaPost.id,
      title: prismaPost.title,
      content: prismaPost.content ? prismaPost.content : undefined,
      link: prismaPost.link ? prismaPost.link : undefined,
      member: member,
      numComments: prismaPost._count?.comments ?? 0,
      voteScore: prismaPost.voteScore,
      postType: prismaPost.postType as PostType,
      dateCreated: prismaPost.dateCreated.toISOString(),
      lastUpdated: prismaPost.lastUpdated.toISOString(),
      slug: prismaPost.slug,
    });
  }

  public toDTO(): PostDTO {
    return {
      id: this.props.id,
      postType: this.props.postType,
      title: this.props.title,
      content: this.props.content,
      link: this.props.link,
      slug: this.props.slug,
      numComments: this.props.numComments,
      voteScore: this.props.voteScore,
      member: this.props.member.toDTO(),
      dateCreated: this.props.dateCreated,
      lastUpdated: this.props.lastUpdated,
    };
  }
}
