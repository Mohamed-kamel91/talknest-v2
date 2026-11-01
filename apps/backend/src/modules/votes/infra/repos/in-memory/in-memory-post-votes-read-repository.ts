import { Spy } from '../../../../../shared/test-doubles/spy';

import type { IPostVotesReadRepository } from '../../../application/ports';
import { MemberPostVotesRoundup } from '../../../application/read-models';
import { PostVote } from '../../../domain/post-vote';

export class InMemoryPostVotesReadRepository
  extends Spy<IPostVotesReadRepository>
  implements IPostVotesReadRepository
{
  private votes: PostVote[] = [];

  public async getMemberPostVotesRoundup(memberId: string): Promise<MemberPostVotesRoundup> {
    this.addCall('getMemberPostVotesRoundup', [memberId]);

    const memberVotes = this.votes.filter((vote) => vote.memberId === memberId);

    return MemberPostVotesRoundup.toDomain({
      memberId,
      allPostsCount: memberVotes.length,
      upvotesCount: memberVotes.filter((vote) => vote.getValue() === 1).length,
      downvotesCount: memberVotes.filter((vote) => vote.getValue() === -1).length,
    });
  }

  // ---- Test setup helpers (no call tracking) ----

  public seed(votes: PostVote[]): void {
    this.votes.push(...votes);
  }

  public async reset(): Promise<void> {
    this.votes = [];
    this.calls = [];
  }

  public getAll(): PostVote[] {
    return this.votes;
  }
}
