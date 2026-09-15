import {
  success,
  fail,
  type Result,
  type IUseCase,
} from '@talknest/core/application';
import { CreateMemberCommand } from '@talknest/api/members';
import { IEventBus } from '@talknest/bus';

import { Member } from '../../../domain/member';
import { IMembersRepository } from '../../ports/members-repository';
import { MemberUsername } from '../../../domain/member-username';
import { InvalidMemberUsernameError } from '../../../domain/errors/member-errors';

export type CreateMemberError = InvalidMemberUsernameError;
export type CreateMemberResponse = Result<Member, CreateMemberError>;

export class CreateMemberUseCase implements IUseCase<
  CreateMemberCommand,
  CreateMemberResponse
> {
  constructor(
    private membersRepository: IMembersRepository,
    private eventBus: IEventBus,
  ) {}

  async execute(
    command: CreateMemberCommand,
  ): Promise<CreateMemberResponse> {
    const { username, userId } = command.props;

    const userNameOrError = MemberUsername.create(username);

    if (userNameOrError.isFailure) {
      return fail(userNameOrError.getError());
    }

    const memberUsername = userNameOrError.getValue();

    const memberOrError = Member.create({
      username: memberUsername,
      userId,
    });

    if (memberOrError.isFailure) {
      return fail(memberOrError.getError());
    }

    const member = memberOrError.getValue();

    await this.membersRepository.save(member);

    return success(member);
  }
}
