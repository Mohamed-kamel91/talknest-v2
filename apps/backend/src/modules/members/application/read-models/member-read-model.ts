import { MemberDTO, ReputationLevel } from '@talknest/api/members';
import { Member as MemberModel } from '@talknest/database';

interface MemberReadModelProps {
  id: string;
  username: string;
  userId: string;
  reputationLevel: ReputationLevel;
  reputationScore: number;
}

export class MemberReadModel {
  private props: MemberReadModelProps;

  constructor(props: MemberReadModelProps) {
    this.props = props;
  }

  get id() {
    return this.props.id;
  }

  get username() {
    return this.props.username;
  }

  get userId() {
    return this.props.userId;
  }

  get reputationLevel() {
    return this.props.reputationLevel;
  }

  get reputationScore() {
    return this.props.reputationScore;
  }

  public static fromPersistence(member: MemberModel) {
    return new MemberReadModel({
      id: member.id,
      username: member.username,
      userId: member.userId,
      reputationLevel: member.reputationLevel,
      reputationScore: member.reputationScore, 
    });
  }

  // Continue to add the remaining properties when necessary
  public toDTO(): MemberDTO {
    return {
      memberId: this.props.id,
      username: this.props.username,
      userId: this.props.userId,
      reputationLevel: this.props.reputationLevel,
      reputationScore: this.props.reputationScore,
    };
  }
}
