import { createAPIClient } from '../../../../../packages/shared/src/api';
import { CreateUserBuilder } from '../../../../../packages/shared/tests/support/builders';
import { UserResultBuilder } from '../../../../../packages/shared/tests/support/builders/user-result-builder';
import { Application } from '../../../src/shared/application';
import { CompositionRoot } from '../../../src/shared/composition-root';
import { Config } from '../../../src/shared/config';
import { WebServer } from '../../../src/shared/http';

describe('Users http API', () => {
  let composition: CompositionRoot;
  let server: WebServer;
  let application: Application;
  let createUserSpy: jest.SpyInstance;

  const config = new Config('test:infra');
  const apiClient = createAPIClient(config.getApiURL());

  beforeAll(async () => {
    composition = CompositionRoot.createCompositionRoot(config);
    server = composition.getWebServer();
    application = composition.getApplication();

    await server.start();

    createUserSpy = jest.spyOn(application.user, 'createUser');
  });

  afterAll(async () => {
    await server.stop();
  });

  afterEach(() => {
    createUserSpy.mockClear();
  });

  it('can create users', async () => {
    const createUserInput = new CreateUserBuilder().build();
    const createUserResultStub = new UserResultBuilder()
      .withEmail(createUserInput.email)
      .withFirstName(createUserInput.firstName)
      .withLastName(createUserInput.lastName)
      .withUsername(createUserInput.username);

    createUserSpy.mockResolvedValue(createUserResultStub);

    await apiClient.user.register(createUserInput);

    expect(application.user.createUser).toHaveBeenCalledTimes(1);
  });
});
