import { type IToDomainMapper } from '@talknest/core/application';

import { PostSlug } from '../../domain/post-slug';

class PostSlugMapper implements IToDomainMapper<string, PostSlug> {
  toDomain(persistence: string): PostSlug {
    return PostSlug.reconstitute(persistence);
  }
}

export const PostSlugMap = new PostSlugMapper();
