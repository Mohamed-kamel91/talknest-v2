import {} from '@talknest/api/members';
import * as Users from '@talknest/api/users';
import { DecodedIdToken } from '@talknest/api/users';
import { PrismaDatabase } from '@talknest/database';
import { InMemoryEventBus } from '@talknest/bus';

import { CreateMember } from './create-member';
import { Member } from '../../../domain/member';
import { ProductionMembersRepository } from '../../../repos/adapters/production-members-repository';
import { Config } from '../../../../../shared/config';

describe('createMember', () => {
  let config = new Config('test:unit');
  let database = new PrismaDatabase();
  let membersRepo = new ProductionMembersRepository(database);
  let eventBus = new InMemoryEventBus();

  const useCase = new CreateMember(membersRepo, eventBus);

  const mockToken: DecodedIdToken = {
    email: 'test@example.com',
    uid: 'auth0|123',
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('should create a member when username is available and data is valid', async () => {
    // Implement
    throw new Error('Not yet implemented');
  });

  test('should fail if username is already taken', async () => {
    // Implement
    throw new Error('Not yet implemented');
  });

  test('should fail if validation fails', async () => {
    // Implement
    throw new Error('Not yet implemented');
  });
});
