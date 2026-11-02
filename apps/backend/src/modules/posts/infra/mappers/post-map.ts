import {
  type IToDomainMapper,
  type IToPersistenceMapper,
} from '@talknest/core/application';
import { Post as PostModel } from '@talknest/database';

import {
  Post,
  type BasePostProps,
  type PostProps,
} from '../../domain/post';
import { PostSlugMap } from './post-slug-map';
import { PostTitleMap } from './post-title-map';
import { PostLinkMap } from './post-link-map';
import { PostContentMap } from './post-content-map';

type PostPersistence = Omit<PostModel, 'createdAt' | 'updatedAt'>;

class PostMapper
  implements
    IToDomainMapper<PostModel, Post>,
    IToPersistenceMapper<Post, PostPersistence>
{
  toDomain(persistence: PostModel): Post {
    const base: BasePostProps = {
      id: persistence.id,
      memberId: persistence.memberId,
      voteScore: persistence.voteScore,
      slug: PostSlugMap.toDomain(persistence.slug),
      title: PostTitleMap.toDomain(persistence.title),
    };

    const postProps: PostProps =
      persistence.postType === 'link'
        ? {
            ...base,
            postType: 'link',
            link: PostLinkMap.toDomain(persistence.link!),
          }
        : {
            ...base,
            postType: 'text',
            content: PostContentMap.toDomain(persistence.content!),
          };

    return Post.reconstitute(postProps);
  }

  toPersistence(post: Post): PostPersistence {
    const base = {
      id: post.id,
      memberId: post.memberId,
      title: post.title.value,
      slug: post.slug.value,
      voteScore: post.voteScore,
    };

    switch (post.postType) {
      case 'text':
        return {
          ...base,
          postType: post.postType,
          content: post.content.value,
          link: null,
        };

      case 'link':
        return {
          ...base,
          postType: post.postType,
          link: post.link.value,
          content: null,
        };

      default: {
        const _exhaustiveCheck: never = post.postType;
        throw new Error(`Unhandled post type: ${_exhaustiveCheck}`);
      }
    }
  }
}

export const PostMap = new PostMapper();
