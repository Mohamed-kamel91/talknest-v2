import { ValueObject } from '@talknest/core/domain';
import {
  reputationLevel,
  type ReputationLevel,
} from '@talknest/api/members';

type ReputationLevelProps = {
  value: ReputationLevel;
};

const LEVELS = [
  reputationLevel.Level1,
  reputationLevel.Level2,
  reputationLevel.Level3,
];

export class MemberReputationLevel extends ValueObject<ReputationLevelProps> {
  private constructor(props: ReputationLevelProps) {
    super(props);
  }

  get value(): ReputationLevel {
    return this.props.value;
  }

  public static create(): MemberReputationLevel {
    return new MemberReputationLevel({
      value: reputationLevel.Level1,
    });
  }

  public static reconstitute(
    value: ReputationLevel,
  ): MemberReputationLevel {
    return new MemberReputationLevel({ value });
  }

  public static createAtLevel(
    level: ReputationLevel,
  ): MemberReputationLevel {
    return new MemberReputationLevel({ value: level });
  }

  public isAtLeast(required: ReputationLevel): boolean {
    return (
      LEVELS.indexOf(this.props.value) >= LEVELS.indexOf(required)
    );
  }
}
