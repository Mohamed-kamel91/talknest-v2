import {
  success,
  fail,
  type Result,
  type UseCase,
} from '@talknest/core/application';
import {
  ConflictError,
  NotFoundError,
} from '@talknest/errors/application';
import { CreateMemberCommand } from '@talknest/api/members';
import { EventBus } from '@talknest/bus';

import { Member } from '../../../domain/member';
import { IMembersRepository } from '../../ports/members-repository';

export type CreateMemberError = NotFoundError | ConflictError;

export class CreateMemberUseCase implements UseCase<
  CreateMemberCommand,
  Result<Member, CreateMemberError>
> {
  constructor(
    private memberRepository: IMembersRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    request: CreateMemberCommand,
  ): Promise<Result<Member, CreateMemberError>> {
    // Implement
    throw new Error('Not yet implemented');
  }
}
