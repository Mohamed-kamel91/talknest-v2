import { type IToDomainMapper } from '@talknest/core/application';

import { PostSlug } from '../../domain/post-slug';
import { PostContent } from '../../domain/post-content';

class PostContentMapper implements IToDomainMapper<
  string,
  PostContent
> {
  toDomain(persistence: string): PostContent {
    return PostContent.reconstitute(persistence);
  }
}

export const PostContentMap = new PostContentMapper();
