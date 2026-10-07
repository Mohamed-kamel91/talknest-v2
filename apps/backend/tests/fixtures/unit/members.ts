// Fixtures (hvut fixtures)
import { reputationLevel } from '@talknest/api/members';

import { Member } from '../../../src/modules/members/domain/member';
import { MemberUsername } from '../../../src/modules/members/domain/member-username';
import { CreatePostUseCase } from '../../../src/modules/posts/application/use-cases/create-post/create-post';
import { PostCommentUseCase } from '../../../src/modules/comments/application/use-cases/post-comment/post-comment';
import { CreateMemberInputBuilder } from '../../builders/create-member-input-builder';
import { InMemoryMembersRepository } from '../../../src/modules/members/infra/repo/in-memory-members-repository';

export function setupLevel1Member(
  repositorySpy: InMemoryMembersRepository,
) {
  const memberInput = new CreateMemberInputBuilder().build();

  const username = MemberUsername.create(
    memberInput.username,
  ).getValue();

  const member = Member.create({
    userId: memberInput.userId,
    username,
  }).getValue();

  repositorySpy.seed([member]);

  return member;
}

export function setupTestWithLevel2Member(
  useCase: CreatePostUseCase | PostCommentUseCase,
) {
  jest.resetAllMocks();

  const level2Member = Member.toDomain({
    userId: '8be25ac7-49ff-43be-9f22-3811e268e0bd',
    username: MemberUsername.toDomain('jill-12345'),
    reputationScore: 10,
    reputationLevel: reputationLevel.Level2,
    id: 'bf6b4773-feea-44cd-a951-f0ffd68625ea',
  });

  useCase['membersRepository'].getMemberById = jest
    .fn()
    .mockResolvedValue(level2Member);

  return level2Member;
}
