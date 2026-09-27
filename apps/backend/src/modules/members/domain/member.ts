import { v4 as uuidv4 } from 'uuid';

import { AggregateRoot, success, type Result } from '@talknest/core';
import {
  ReputationLevel,
  reputationLevel,
} from '@talknest/api/members';

import { MemberReputationLevelUpgraded } from './events/member-reputation-level-upgraded';
import { MemberUsername } from './member-username';

interface MemberProps {
  id: string;
  userId: string;
  username: MemberUsername;
  reputationScore: number;
  reputationLevel: ReputationLevel;
}

type CreateMemberProps = Omit<
  MemberProps,
  'id' | 'reputationScore' | 'reputationLevel'
> &
  Partial<Pick<MemberProps, 'id'>>;

export class Member extends AggregateRoot {
  public static REPUTATION_SCORE_THRESH = {
    Level1: 5,
    Level2: 10,
  };

  private constructor(private props: MemberProps) {
    super();
  }

  get id() {
    return this.props.id;
  }

  get userId() {
    return this.props.userId;
  }

  get reputationScore() {
    return this.props.reputationScore;
  }

  get username() {
    return this.props.username;
  }

  get reputationLevel() {
    return this.props.reputationLevel;
  }

  public static create(
    props: CreateMemberProps,
  ): Result<Member, never> {
    return success(
      new Member({
        ...props,
        id: props.id ?? uuidv4(),
        reputationScore: 0,
        reputationLevel: reputationLevel.Level1,
      }),
    );
  }

  public static reconstitute(props: MemberProps): Member {
    return new Member({
      ...props,
    });
  }

  public updateReputationScore(newScore: number) {
    const oldScore = this.props.reputationScore;
    this.props.reputationScore = newScore;

    console.log('score', newScore);
    if (
      oldScore < Member.REPUTATION_SCORE_THRESH.Level1 &&
      newScore >= Member.REPUTATION_SCORE_THRESH.Level1
    ) {
      this.props.reputationLevel = reputationLevel.Level2;

      this.domainEvents.push(
        new MemberReputationLevelUpgraded(
          this.id,
          this.reputationLevel,
        ),
      );
      console.log('going to level 2!');
    } else if (
      oldScore < Member.REPUTATION_SCORE_THRESH.Level2 &&
      newScore >= Member.REPUTATION_SCORE_THRESH.Level2
    ) {
      this.props.reputationLevel = reputationLevel.Level3;
      console.log('going to level 3!');
      this.domainEvents.push(
        new MemberReputationLevelUpgraded(
          this.id,
          this.reputationLevel,
        ),
      );
    }
  }
}
