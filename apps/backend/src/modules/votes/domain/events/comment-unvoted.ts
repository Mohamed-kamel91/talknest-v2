import { DomainEvent } from '@talknest/core/domain';

import type { CommentVoteEventData } from './types';

export class CommentUnvoted extends DomainEvent<CommentVoteEventData> {
  static readonly eventName = 'CommentUnvoted';

  constructor(data: CommentVoteEventData) {
    super(CommentUnvoted.eventName, data.voteId, data);
  }
}
