import {
  success,
  fail,
  type Result,
  type IUseCase,
} from '@talknest/core/application';
import { CreateMemberCommand } from '@talknest/api/members';
import { type IEventBus } from '@talknest/bus';

import { Member } from '../../../domain/member';
import type { IMembersRepository } from '../../ports/members-repository';
import { MemberUsername } from '../../../domain/member-username';
import {
  InvalidMemberUsernameError,
  MemberUsernameTakenError,
} from '../../../domain/errors/member-errors';

export type CreateMemberError =
  InvalidMemberUsernameError | MemberUsernameTakenError;
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

    const existingMember = await this.membersRepository.getByUsername(
      userNameOrError.getValue().value,
    );

    if (existingMember) {
      return fail(new MemberUsernameTakenError(username));
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

    this.eventBus.publishEvents(member.getDomainEvents());

    return success(member);
  }
}
