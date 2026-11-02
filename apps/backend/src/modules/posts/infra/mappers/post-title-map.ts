import { type IToDomainMapper } from '@talknest/core/application';

import { PostTitle } from '../../domain/post-title';

class PostTitleMapper implements IToDomainMapper<string, PostTitle> {
  toDomain(persistence: string): PostTitle {
    return PostTitle.reconstitute(persistence);
  }
}

export const PostTitleMap = new PostTitleMapper();
