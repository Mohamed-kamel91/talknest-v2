import { IEventBus, InMemoryEventBus } from '@talknest/bus';
import { memberErrorCodes } from '@talknest/errors';
import { CreatePostCommand, CreatePostInput } from '@talknest/api/posts';

import { setupLevel1Member } from '../../../../../../tests/fixtures/unit/members';

import { InMemoryMembersRepository } from '../../../../members/infra/repo/in-memory-members-repository';
import { InsufficientMemberLevelError } from '../../../../members/domain/errors/member-errors';
import { InMemoryPostsRepository } from '../../../infra/repos/in-memory-posts-repository';
import { CreatePostUseCase } from './create-post';

describe('createPost', () => {
  let eventBus: IEventBus;
  let membersRepositorySpy: InMemoryMembersRepository;
  let postsRepositorySpy: InMemoryPostsRepository;
  let createPostUseCase: CreatePostUseCase;

  beforeEach(() => {
    membersRepositorySpy = new InMemoryMembersRepository();
    postsRepositorySpy = new InMemoryPostsRepository();
    eventBus = new InMemoryEventBus();

    jest.spyOn(eventBus, 'publishEvents');

    createPostUseCase = new CreatePostUseCase(
      postsRepositorySpy,
      membersRepositorySpy,
      eventBus,
    );
  });

  describe('permissions & identity', () => {
    test.skip('as a level 1 member, I should not be able to create a new post', async () => {
      const member = setupLevel1Member(membersRepositorySpy);

      const createPostInput: CreatePostInput = {
        title: 'New Post',
        content: 'This is a new post',
        postType: 'text',
        memberId: member.id,
      };

      const commandOrError = CreatePostCommand.create(createPostInput);
      expect(commandOrError.isSuccess).toBe(true);

      const result = await createPostUseCase.execute(commandOrError.getValue());

      expect(result.isSuccess).toBe(false);
      expect(result.getError()).toBeDefined();
      expect(result.getError()).toBeInstanceOf(InsufficientMemberLevelError);
      expect(result.getError().code).toBe(
        memberErrorCodes.INSUFFICIENT_MEMBER_LEVEL,
      );

      expect(membersRepositorySpy.getTimesMethodCalled('getById')).toBe(1);
      expect(postsRepositorySpy.wasMethodCalled('save')).toBe(false);
      expect(eventBus.publishEvents).not.toHaveBeenCalled();
    });

    test.skip('if the member was not found, they should not be able to create the post', async () => {});

    test.skip('as a level 2 member, I should be able to create a new post', async () => {
      // Implement!
      throw new Error('To be implemented');
    });
  });

  describe('text posts', () => {
    test.skip('as a level 2 member, I should be able to create a new text post with valid post details', async () => {
      // Implement!
      throw new Error('To be implemented');
    });

    test.skip.each([
      { title: '', content: '' },
      { title: 'A', content: 'sdsd' },
      { title: 'Title! Looks good. But no content.', content: '' },
      { title: 'Another', content: '2' },
    ])(
      'as a level 2 member, I should not be able to create a text post with invalid title or content: %o',
      async ({ title, content }) => {
        // Implement!
        throw new Error('To be implemented');
      },
    );
  });

  describe('link posts', () => {
    test.skip('as a level 2 member, I should be able to create a new link post with valid post details', async () => {
      // Implement!
      throw new Error('To be implemented');
    });

    test.skip.each([
      { title: 'A new post', link: '' },
      { title: 'A new post', link: 'invalid-url' },
      { title: 'A new post', link: 'www.google.com' }, // Assuming the link should be a full URL with http/https
    ])(
      'as a level 2 member, I should not be able to create a link post with an invalid link: %o',
      async ({ title, link }) => {
        // Implement!
        throw new Error('To be implemented');
      },
    );
  });

  describe('default votes', () => {
    test.skip('as a level 2 member, when creating a new post, the post should have 1 upvote by me', async () => {
      // We can only test this in the integration test, because the vote is created in the domain event
      // No need to implement.
    });
  });
});
