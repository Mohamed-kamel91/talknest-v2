import { type IToDomainMapper, type IToPersistenceMapper } from '@talknest/core/application';
import { CommentVoteModel } from '@talknest/database';

import { CommentVote } from '../../domain/comment-vote';
import { VoteStatus } from '../../domain/vote-status';

type CommentVotePersistence = Omit<CommentVoteModel, 'createdAt' | 'updatedAt'>;

class CommentVoteMapper
  implements
    IToDomainMapper<CommentVoteModel, CommentVote>,
    IToPersistenceMapper<CommentVote, CommentVotePersistence>
{
  public toDomain(persistence: CommentVoteModel): CommentVote {
    return CommentVote.reconstitute({
      id: persistence.id,
      commentId: persistence.commentId,
      memberId: persistence.memberId,
      voteStatus: VoteStatus.reconstituteFromValue(persistence.value),
    });
  }

  public toPersistence(commentVote: CommentVote): CommentVotePersistence {
    return {
      id: commentVote.id,
      commentId: commentVote.commentId,
      memberId: commentVote.memberId,
      value: commentVote.getValue(),
    };
  }
}

export const CommentVoteMap = new CommentVoteMapper();
