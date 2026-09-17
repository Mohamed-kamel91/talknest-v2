import { InMemoryEventBus, type IEventBus } from '@talknest/bus';
import { CreateMemberCommand } from '@talknest/api/members';

import { InMemoryMembersRepository } from '../../../infra/repo/in-memory-members-repository';
import { Member } from '../../../domain/member';
import { CreateMemberUseCase } from './create-member';
import { MemberUsernameTakenError } from '../../../domain/errors/member-errors';
import { setupLevel1Member } from '../../../../../../tests/fixtures/unit/members';
import { CreateMemberInputBuilder } from '../../../../../../tests/builders/create-member-input-builder';

describe('createMember', () => {
  let eventBus: IEventBus;
  let membersRepositorySpy: InMemoryMembersRepository;
  let createMemberUseCase: CreateMemberUseCase;

  beforeAll(async () => {
    membersRepositorySpy = new InMemoryMembersRepository();
    eventBus = new InMemoryEventBus();
    createMemberUseCase = new CreateMemberUseCase(
      membersRepositorySpy,
      eventBus,
    );
  });

  afterEach(() => {
    membersRepositorySpy.reset();
  });

  it('should create a member when username is available and data is valid', async () => {
    const createMemberInput = new CreateMemberInputBuilder().build();
    const commandOrError = CreateMemberCommand.create(createMemberInput);
    expect(commandOrError.isSuccess).toBe(true);

    const result = await createMemberUseCase.execute(commandOrError.getValue());
    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toBeInstanceOf(Member);
    expect(membersRepositorySpy.getTimesMethodCalled('save')).toBe(1);
  });

  it('should fail if username is already taken', async () => {
    const existingMember = setupLevel1Member(membersRepositorySpy);

    const createMemberInput = new CreateMemberInputBuilder()
      .withUsername(existingMember.username.value)
      .build();
    const commandOrError = CreateMemberCommand.create(createMemberInput);
    expect(commandOrError.isSuccess).toBe(true);

    const result = await createMemberUseCase.execute(commandOrError.getValue());
    expect(result.isFailure).toBe(true);
    expect(result.getError()).toBeDefined();
    expect(result.getError()).toBeInstanceOf(MemberUsernameTakenError);
    expect(result.getError().code).toBe('MEMBER_USERNAME_TAKEN');

    expect(membersRepositorySpy.getTimesMethodCalled('save')).toBe(0);
    expect(membersRepositorySpy.getTimesMethodCalled('getByUsername')).toBe(1);
  });

  test('should fail if member already exists', async () => {
    const existingMember = setupLevel1Member(membersRepositorySpy);

    const memberInput = new CreateMemberInputBuilder()
      .withUserId(existingMember.userId)
      .build();

    const commandOrError = CreateMemberCommand.create(memberInput);
    expect(commandOrError.isSuccess).toBe(true);

    const result = await createMemberUseCase.execute(commandOrError.getValue());

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toBeInstanceOf(MemberAlreadyExistsError);
    expect(result.getError().code).toBe(memberErrorCodes.MEMBER_ALREADY_EXISTS);

    expect(membersRepositorySpy.getTimesMethodCalled('getByUserId')).toBe(1);
    expect(membersRepositorySpy.getTimesMethodCalled('save')).toBe(0);
  });

  // it('should fail if validation fails', async () => {
  //   // Implement
  //   throw new Error('Not yet implemented');
  // });

  // it('should publish "MemberCreated' event after member is persisted, async () => {
  //   // Implement
  //   throw new Error('Not yet implemented');
  // });
});
