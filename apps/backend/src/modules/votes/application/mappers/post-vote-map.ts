import { type IToDomainMapper, type IToPersistenceMapper } from '@talknest/core/application';
import { PostVoteModel } from '@talknest/database';

import { VoteStatus } from '../../domain/vote-status';
import { PostVote } from '../../domain/post-vote';

type PostVotePersistence = Omit<PostVoteModel, 'createdAt' | 'updatedAt'>;

class PostVoteMapper
  implements
    IToDomainMapper<PostVoteModel, PostVote>,
    IToPersistenceMapper<PostVote, PostVotePersistence>
{
  public toDomain(persistence: PostVoteModel): PostVote {
    return PostVote.reconstitute({
      id: persistence.id,
      postId: persistence.postId,
      memberId: persistence.memberId,
      voteStatus: VoteStatus.reconstituteFromValue(persistence.value),
    });
  }

  public toPersistence(postVote: PostVote): PostVotePersistence {
    return {
      id: postVote.id,
      postId: postVote.postId,
      memberId: postVote.memberId,
      value: postVote.getValue(),
    };
  }
}

export const PostVoteMap = new PostVoteMapper();
