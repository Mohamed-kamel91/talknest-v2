import { InMemoryEventBus, type IEventBus } from '@talknest/bus';
import { CreateMemberCommand, CreateMemberInput } from '@talknest/api/members';

import { InMemoryMembersRepository } from '../../../infra/repo/in-memory-members-repository';
import { Member } from '../../../domain/member';
import { MemberUsername } from '../../../domain/member-username';
import { CreateMemberUseCase } from './create-member';

describe('createMember', () => {
  let eventBus: IEventBus;
  let membersRepositorySpy: InMemoryMembersRepository;
  let createMemberUseCase: CreateMemberUseCase;

  const createMemberInput: CreateMemberInput = {
    username: 'mohKamel123',
    email: 'test@example.com',
    userId: 'auth0|123',
  };

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
    const commandOrError = CreateMemberCommand.create(createMemberInput);
    expect(commandOrError.isSuccess).toBe(true);

    const result = await createMemberUseCase.execute(commandOrError.getValue());

    expect(result.isSuccess).toBe(true);
    expect(result.getValue()).toBeInstanceOf(Member);
    expect(membersRepositorySpy.getTimesMethodCalled('save')).toBe(1);
  });

  it('should fail if username is already taken', async () => {
    const { userId, username: duplicateUsername } = createMemberInput;

    // Create Existing member in repo
    const existingMemberUsername =
      MemberUsername.create(duplicateUsername).getValue();
    const existingMember = Member.create({
      userId: 'auth0|12345',
      username: existingMemberUsername,
    });

    membersRepositorySpy.seed([existingMember.getValue()]);

    // Execute usecase
    const commandOrError = CreateMemberCommand.create({
      userId,
      username: duplicateUsername,
    });
    expect(commandOrError.isSuccess).toBe(true);

    const result = await createMemberUseCase.execute(commandOrError.getValue());

    expect(result.isFailure).toBe(true);
    expect(result.getError()).toBeDefined();
    expect(result.getError()).toBeInstanceOf(MemberUsernameTakenError);
    expect(result.getError().code).toBe('MEMBER_USERNAME_TAKEN');

    expect(membersRepositorySpy.getTimesMethodCalled('save')).toBe(0);
    expect(membersRepositorySpy.getTimesMethodCalled('getByUsername')).toBe(1);
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
