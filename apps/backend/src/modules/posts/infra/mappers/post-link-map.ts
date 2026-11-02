import { type IToDomainMapper } from '@talknest/core/application';

import { PostLink } from '../../domain/post-link';

class PostLinkMapper implements IToDomainMapper<string, PostLink> {
  toDomain(persistence: string): PostLink {
    return PostLink.reconstitute(persistence);
  }
}

export const PostLinkMap = new PostLinkMapper();
