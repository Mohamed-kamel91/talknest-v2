import { PrismaDatabase } from '@talknest/database';
import { InMemoryEventBus } from '@talknest/bus';
import { PostCommentCommand } from '@talknest/api/comments';

import { PostCommentUseCase } from './post-comment';
import { CommentPosted } from '../../../domain/events/comment-posted';
import { Comment } from '../../../domain/comment';
import { PrismaPostsRepository } from '../../../../posts/infra/repos/prisma-posts-repository';
import { PrismaMembersRepository } from '../../../../members/infra/repo/prisma-members-repository';
import { PrismaCommentsRepository } from '../../../infra/repos/prisma-comment-repository';
import { Config } from '../../../../../shared/config';

// import { setupTestWithLevel1Member } from '../../../../../../tests/fixtures/unit/members';
// import { withExistingPostByRandomMember } from '../../../../../../tests/fixtures/unit/posts';

describe('postComment', () => {
  const config = new Config('test:unit');
  const database = new PrismaDatabase();
  const commentsRepo = new PrismaCommentsRepository(database);
  const postsRepo = new PrismaPostsRepository(database);
  const membersRepo = new PrismaMembersRepository(database);
  const eventBus = new InMemoryEventBus();
  const useCase = new PostCommentUseCase(
    commentsRepo,
    postsRepo,
    membersRepo,
    eventBus,
  );

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('permissions & identity', () => {
    test('as a level 1 member, I should be able to post a comment', async () => {
      // Implement
      throw new Error('Not yet implemented');
    });
  });

  describe('posting comments', () => {
    test('if the member does not exist, the comment should not be created', async () => {
      // Implement
      throw new Error('Not yet implemented');
    });

    test('if the post was not found, the comment should not be created', async () => {
      // Implement
      throw new Error('Not yet implemented');
    });
  });

  describe('comment validation', () => {
    test('should not allow empty comments', async () => {
      // Implement
      throw new Error('Not yet implemented');
    });

    test('should not allow comments exceeding 1000 characters', async () => {
      // Implement
      throw new Error('Not yet implemented');
    });
  });
});
