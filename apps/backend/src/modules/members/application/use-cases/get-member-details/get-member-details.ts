import {
  type Result,
  type UseCase,
} from '@talknest/core/application';
import { NotFoundError } from '@talknest/errors/application';

import { IMembersRepository } from '../../ports/members-repository';
import { Member } from '../../../domain/member';

export type GetMemberDetailsError = NotFoundError;

export class GetMemberDetailsUseCase implements UseCase<
  string,
  Result<Member, GetMemberDetailsError>
> {
  constructor(private memberRepository: IMembersRepository) {}

  async execute(
    userId: string,
  ): Promise<Result<Member, GetMemberDetailsError>> {
    throw new Error('Implement');
    // Implement
  }
}
