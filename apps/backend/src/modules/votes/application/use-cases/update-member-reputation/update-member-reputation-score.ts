import { EventBus } from '@talknest/bus';
import { Result, UseCase } from '@talknest/core/application';
import { UpdateMemberReputationScoreCommand } from '@talknest/api/votes';
import { DatabaseError } from '@talknest/errors/server';

import { Member } from '../../../../members/domain/member';
import { IVoteRepository } from '../../../../votes/repos/ports/vote-repository';
import { IMembersRepository } from '../../../../members/repos/ports/members-repository';
import { MemberNotFoundError } from '../../../../members/member-errors';

type UpdateMemberReputationError =
  MemberNotFoundError | DatabaseError;

// Note: This is also something which could be done on a cron job
// We could have a cron job that runs every 24 hours and updates the reputation score of all members using
// the read models. This would be a good way to ensure that the reputation score is always up to date.

export class UpdateMemberReputationScore implements UseCase<
  UpdateMemberReputationScoreCommand,
  Result<Member, UpdateMemberReputationError>
> {
  constructor(
    private memberRepository: IMembersRepository,
    private votesRepository: IVoteRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    request: UpdateMemberReputationScoreCommand,
  ): Promise<Result<Member, UpdateMemberReputationError>> {
    const { memberId } = request.props;

    const [memberOrNull, commentVotesRoundup, postVotesRoundup] =
      await Promise.all([
        this.memberRepository.getMemberById(memberId),
        this.votesRepository.getMemberCommentVotesRoundup(memberId),
        this.votesRepository.getMemberPostVotesRoundup(memberId),
      ]);

    if (memberOrNull === null) {
      return Result.failure(new MemberNotFoundError());
    }

    // Get the current score from the read models for this member to calculate
    // We calculate the score by:
    // - all comment upvotes not owned by this member (score)
    // - all post upvotes not owned by this member (score)
    const newScore =
      commentVotesRoundup.getScore() + postVotesRoundup.getScore();

    // This is another great example and reason for why we need read models.
    // More optimized queries.

    memberOrNull.updateReputationScore(newScore);

    try {
      await this.memberRepository.save(memberOrNull);
      await this.eventBus.publishEvents(
        memberOrNull.getDomainEvents(),
      );
      return Result.success(memberOrNull);
    } catch (err) {
      return Result.failure(new DatabaseError());
    }
  }
}
