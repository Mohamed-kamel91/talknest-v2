import path from 'path';
import { loadFeature, defineFeature } from 'jest-cucumber';

import { Config } from '../../../src/shared/config';
import { CompositionRoot } from '../../../src/shared/composition-root';
import { type Application } from '../../../src/shared/application';

import { CreateUserCommand } from '../../../src/modules/users/user-command';
import { type InMemoryUserRepo } from '../../../src/modules/users/adapters/In-memory-user-repo';
import {
  EmailAlreadyTakenError,
  UsernameAlreadyTakenError,
} from '../../../src/modules/users/user-errors';
import { type FakeTransactionalEmailAPI } from '../../../src/modules/notifications/adapters/transactional-email-api';
import { type FakeContactListAPI } from '../../../src/modules/marketing/adapters/contact-list-api';

import { sharedTestRoot } from '@talknest/test-support';
import { type CreateUserInput, UserDTO } from '@talknest/api/users';
import { type EmailSubscription } from '@talknest/api/marketing';
import { requestErrorTypes, InvalidInputError } from '@talknest/errors/request';
import { CreateUserBuilder } from '@talknest/test-support/builders';

const feature = loadFeature(
  path.join(sharedTestRoot, 'features/registration.feature'),
  { tagFilter: '@backend' },
);

defineFeature(feature, (test) => {
  const config = new Config('test:unit');

  let composition: CompositionRoot;
  let application: Application;
  let userRepoSpy: InMemoryUserRepo;
  let contactListAPISpy: FakeContactListAPI;
  let transactionalEmailAPISpy: FakeTransactionalEmailAPI;

  beforeAll(() => {
    composition = CompositionRoot.createCompositionRoot(config);
    application = composition.getApplication();
    userRepoSpy = composition.getRepositories().user as InMemoryUserRepo;
    contactListAPISpy = composition.getContactListAPI() as FakeContactListAPI;
    transactionalEmailAPISpy =
      composition.getTransactionalEmailAPI() as FakeTransactionalEmailAPI;
  });

  afterEach(async () => {
    await userRepoSpy.reset();
    contactListAPISpy.reset();
    transactionalEmailAPISpy.reset();
  });

  test('Successful registration with marketing emails accepted', ({
    given,
    when,
    then,
    and,
  }) => {
    let createUserInput: CreateUserCommand;
    let createUserResult: UserDTO;
    let addEmailToListResult: EmailSubscription;

    given('I am a new user', () => {
      createUserInput = new CreateUserBuilder().buildCommand();
    });

    when(
      'I register with valid account details accepting marketing emails',
      async () => {
        createUserResult = await application.user.createUser(createUserInput);

        addEmailToListResult = await application.marketing.addEmailToList({
          email: createUserInput.email,
        });
      },
    );

    then('I should be granted access to my account', async () => {
      // Result verification
      expect(createUserResult).toBeDefined();
      expect(createUserResult.id).toBeDefined();
      expect(createUserResult.email).toBe(createUserInput.email);
      expect(createUserResult.firstName).toBe(createUserInput.firstName);
      expect(createUserResult.lastName).toBe(createUserInput.lastName);
      expect(createUserResult.username).toBe(createUserInput.username);

      // State verification
      const getUserByEmailResult = await application.user.getUserByEmail(
        createUserInput.email,
      );

      expect(getUserByEmailResult).toBeDefined();
      expect(getUserByEmailResult.email).toBe(createUserInput.email);

      // Communication verification
      expect(userRepoSpy.getTimesMethodCalled('save')).toBe(1);
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toBe(1);
    });

    and('I should expect to receive marketing emails', () => {
      expect(addEmailToListResult).toBeDefined();
      expect(addEmailToListResult.email).toBe(createUserInput.email);
      expect(addEmailToListResult.subscribed).toBeTruthy();

      // Communication verification
      expect(contactListAPISpy.getTimesMethodCalled('addEmailToList')).toBe(1);
    });
  });

  test('Successful registration without marketing emails accepted', ({
    given,
    when,
    then,
  }) => {
    let createUserInput: CreateUserCommand;
    let createUserResult: UserDTO;

    given('I am a new user', async () => {
      createUserInput = new CreateUserBuilder().buildCommand();
    });

    when(
      'I register with valid account details declining marketing emails',
      async () => {
        createUserResult = await application.user.createUser(createUserInput);
      },
    );

    then('I should be granted access to my account', async () => {
      // Result verification
      expect(createUserResult).toBeDefined();
      expect(createUserResult.id).toBeDefined();
      expect(createUserResult.email).toBe(createUserInput.email);
      expect(createUserResult.firstName).toBe(createUserInput.firstName);
      expect(createUserResult.lastName).toBe(createUserInput.lastName);
      expect(createUserResult.username).toBe(createUserInput.username);

      // State verification
      const getUserByEmailResult = await application.user.getUserByEmail(
        createUserInput.email,
      );

      expect(getUserByEmailResult).toBeDefined();
      expect(getUserByEmailResult.email).toBe(createUserInput.email);

      // Communication verification
      expect(userRepoSpy.getTimesMethodCalled('save')).toBe(1);
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toBe(1);
    });
  });

  test('Invalid or missing registration details', ({
    given,
    when,
    then,
    and,
  }) => {
    let createUserInput: CreateUserInput;
    let createUserCommand: CreateUserCommand;
    let error: any;

    given('I am a new user', async () => {
      createUserInput = new CreateUserBuilder().withLastName('').build();
    });

    when('I register with invalid account details', async () => {
      try {
        createUserCommand = CreateUserCommand.fromProps(createUserInput);
        await application.user.createUser(createUserCommand);
      } catch (e) {
        error = e;
      }
    });

    then('I should see an error notifying me that my input is invalid', () => {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(InvalidInputError);
      expect(error.type).toBe(requestErrorTypes.INVALID_INPUT);
      expect(userRepoSpy.getTimesMethodCalled('save')).toBe(0);
    });

    and('I should not have been sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toBe(0);
    });
  });

  test('Account already created with email', ({ given, when, then, and }) => {
    let createUserResults: any[] = [];

    given(
      'a set of users already created accounts',
      async (table: CreateUserInput[]) => {
        await Promise.all(
          table.map((row) => {
            const userInput = new CreateUserBuilder()
              .withEmail(row.email)
              .withUsername(row.username)
              .withFirstName(row.firstName)
              .withLastName(row.lastName)
              .withPassword(row.password)
              .buildCommand();

            return userRepoSpy.save(userInput);
          }),
        );
      },
    );

    when(
      'new users attempt to register with those emails',
      (table: CreateUserInput[]) => {
        table.forEach((user) => {
          const createUserCommand = new CreateUserBuilder()
            .withFirstName(user.firstName)
            .withLastName(user.lastName)
            .withUsername(user.username)
            .withEmail(user.email)
            .withPassword(user.password)
            .buildCommand();

          const result = application.user.createUser(createUserCommand);

          createUserResults.push(result);
        });
      },
    );

    then(
      'they should see an error notifying them that the account already exists',
      () => {
        createUserResults.forEach((result) => {
          expect(result).rejects.toThrow(EmailAlreadyTakenError);
        });
      },
    );

    and('they should not be sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toBe(0);
    });
  });

  test('Username already taken', ({ given, when, then, and }) => {
    let createUserResults: any[] = [];

    given(
      'a set of users have already created their accounts with valid details',
      async (table: CreateUserInput[]) => {
        await Promise.all(
          table.map((row) => {
            const userInput = new CreateUserBuilder()
              .withEmail(row.email)
              .withUsername(row.username)
              .withFirstName(row.firstName)
              .withLastName(row.lastName)
              .withPassword(row.password)
              .buildCommand();

            return userRepoSpy.save(userInput);
          }),
        );
      },
    );

    when(
      'new users attempt to register with already taken usernames',
      (table: CreateUserInput[]) => {
        table.forEach((user) => {
          const createUserCommand = new CreateUserBuilder()
            .withFirstName(user.firstName)
            .withLastName(user.lastName)
            .withUsername(user.username)
            .withEmail(user.email)
            .withPassword(user.password)
            .buildCommand();

          const result = application.user.createUser(createUserCommand);

          createUserResults.push(result);
        });
      },
    );

    then(
      'they see an error notifying them that the username has already been taken',
      () => {
        createUserResults.forEach((result) => {
          expect(result).rejects.toThrow(UsernameAlreadyTakenError);
        });
      },
    );

    and('they should not be sent access to account details', () => {
      expect(transactionalEmailAPISpy.getTimesMethodCalled('sendMail')).toBe(0);
    });
  });
});
