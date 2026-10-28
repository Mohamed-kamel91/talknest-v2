import { VoteType } from '@talknest/api/votes';

import {
  CommentVote,
  CreateCommentVoteProps,
} from '../../../src/modules/votes/domain/comment-vote';
import { InMemoryCommentVotesRepository } from '../../../src/modules/votes/infra/repos';
import { aCommentVote } from '../../builders/vote-input-builder';

type BuildCommentVoteOverrides = Partial<CreateCommentVoteProps> & {
  voteType?: VoteType;
};

export function buildCommentVote(overrides: BuildCommentVoteOverrides = {}) {
  const input = aCommentVote().build();

  const vote = CommentVote.create({
    memberId: overrides.memberId ?? input.memberId,
    commentId: overrides.commentId ?? input.commentId,
  });

  vote.castVote(overrides.voteType ?? input.voteType);
  vote.clearDomainEvents();

  return vote;
}

export function setupCommentVote(
  inMemoryCommentVotesRepository: InMemoryCommentVotesRepository,
  overrides: BuildCommentVoteOverrides = {},
) {
  const existingVote = buildCommentVote(overrides);

  inMemoryCommentVotesRepository.seed([existingVote]);

  return existingVote;
}
