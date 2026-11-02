import { type IToDomainMapper } from '@talknest/core/application';
import { PostType as PrismaPostType } from '@talknest/database';

import { PostType, type PostTypeValue } from '../../domain/post-type';

class PostTypeMapper implements IToDomainMapper<
  PrismaPostType,
  PostType
> {
  toDomain(persistence: PrismaPostType): PostType {
    return PostType.reconstitute(persistence as PostTypeValue);
  }
}

export const PostTypeMap = new PostTypeMapper();
