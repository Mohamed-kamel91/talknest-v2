import {
  type Result,
  type IUseCase,
} from '@talknest/core/application';
import { NotFoundError } from '@talknest/errors/application';

import type { IMembersRepository } from '../../ports/members-repository';
import { Member } from '../../../domain/member';

export type GetMemberDetailsError = NotFoundError;
export type GetMemberDetailsResponse = Result<
  Member,
  GetMemberDetailsError
>;

export class GetMemberDetailsUseCase implements IUseCase<
  string,
  GetMemberDetailsResponse
> {
  constructor(private memberRepository: IMembersRepository) {}

  async execute(userId: string): Promise<GetMemberDetailsResponse> {
    throw new Error('Implement');
    // Implement
  }
}
