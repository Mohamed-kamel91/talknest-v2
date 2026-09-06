import {
  type Result,
  type IUseCase,
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
export type CreateMemberResonse = Result<Member, CreateMemberError>;

export class CreateMemberUseCase implements IUseCase<
  CreateMemberCommand,
  CreateMemberResonse
> {
  constructor(
    private memberRepository: IMembersRepository,
    private eventBus: EventBus,
  ) {}

  async execute(
    request: CreateMemberCommand,
  ): Promise<CreateMemberResonse> {
    // Implement
    throw new Error('Not yet implemented');
  }
}
