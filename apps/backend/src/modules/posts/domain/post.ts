import { v4 as uuidv4 } from 'uuid';

import {
  success,
  fail,
  type Result,
} from '@talknest/core/application';
import { AggregateRoot } from '@talknest/core/domain';

import { PostCreated } from './events/post-created';
import { PostSlug } from './post-slug';
import { PostTitle } from './post-title';
import { PostContent } from './post-content';
import { PostLink } from './post-link';
import { PostType } from './post-type';
import {
  InvalidLinkPostError,
  InvalidTextPostError,
} from './errors/posts-errors';

export interface BasePostProps {
  id: string;
  memberId: string;
  title: PostTitle;
  voteScore: number;
  slug: PostSlug;
}

export interface TextPostProps extends BasePostProps {
  postType: 'text';
  content: PostContent;
  link?: undefined;
}

export interface LinkPostProps extends BasePostProps {
  postType: 'link';
  link: PostLink;
  content?: undefined;
}

export type PostProps = TextPostProps | LinkPostProps;

type CreateTextPostProps = {
  memberId: string;
  title: PostTitle;
  postType: PostType;
  content: PostContent;
  link?: undefined;
};

type CreateLinkPostProps = {
  memberId: string;
  title: PostTitle;
  postType: PostType;
  link: PostLink;
  content?: undefined;
};

export type CreatePostProps =
  CreateTextPostProps | CreateLinkPostProps;

export class Post extends AggregateRoot {
  constructor(private props: PostProps) {
    super();
  }

  get id(): string {
    return this.props.id;
  }

  get memberId(): string {
    return this.props.memberId;
  }

  get title(): PostTitle {
    return this.props.title;
  }

  get postType(): PostProps['postType'] {
    return this.props.postType;
  }

  get link() {
    if (this.props.postType !== 'link') {
      throw new Error('Text posts do not have a link');
    }

    return this.props.link;
  }

  get content(): PostContent {
    if (this.props.postType !== 'text') {
      throw new Error('Link posts do not have content');
    }

    return this.props.content;
  }

  get voteScore(): number {
    return this.props.voteScore;
  }

  get slug(): PostSlug {
    return this.props.slug;
  }

  public static create(
    input: CreatePostProps,
  ): Result<Post, InvalidTextPostError | InvalidLinkPostError> {
    const { memberId, postType, title } = input;

    const baseProps = {
      id: uuidv4(),
      memberId,
      title,
      voteScore: 0,
      slug: PostSlug.create(title.value),
    };

    let props: PostProps;

    if (postType.value === 'text') {
      if ('link' in input) {
        return fail(
          new InvalidTextPostError(
            'A text post cannot contain a link',
          ),
        );
      }

      props = {
        ...baseProps,
        postType: 'text',
        content: input.content,
      };
    } else {
      if ('content' in input) {
        return fail(
          new InvalidLinkPostError(
            'A link post cannot contain text content',
          ),
        );
      }

      props = {
        ...baseProps,
        postType: 'link',
        link: input.link,
      };
    }

    const post = new Post(props);

    post.domainEvents.push(new PostCreated(post.id, memberId));

    return success(post);
  }

  public static reconstitute(props: PostProps): Post {
    return new Post({
      ...props,
    });
  }

  public isTextPost(): boolean {
    return this.props.postType === 'text';
  }

  public isLinkPost(): boolean {
    return this.props.postType === 'link';
  }
}
