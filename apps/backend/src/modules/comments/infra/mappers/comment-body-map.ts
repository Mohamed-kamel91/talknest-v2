import { type IToDomainMapper } from '@talknest/core/application';

import { CommentBody } from '../../domain/comment-body';

class CommentBodyMapper implements IToDomainMapper<
  string,
  CommentBody
> {
  public toDomain(body: string): CommentBody {
    return CommentBody.reconstitute(body);
  }
}

export const CommentBodyMap = new CommentBodyMapper();
