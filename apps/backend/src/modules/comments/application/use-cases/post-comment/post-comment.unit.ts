import { PrismaDatabase } from '@talknest/database';
import { InMemoryEventBus } from '@talknest/bus';
import { PostCommentCommand } from '@talknest/api/comments';

import { PostComment } from './post-comment';
import { CommentPosted } from '../../../domain/comment-posted';
import { Comment } from '../../../domain/comment';
import { ProductionPostsRepository } from '../../../../posts/repos/adapters/production-posts-repository';
import { ProductionMembersRepository } from '../../../../members/repos/adapters/production-members-repository';
import { ProductionCommentsRepository } from '../../../repos/adapters/production-comment-repository';
import { Config } from '../../../../../shared/config';

import { setupTestWithLevel1Member } from '../../../../../../tests/fixtures/unit/members';
import { withExistingPostByRandomMember } from '../../../../../../tests/fixtures/unit/posts';

describe('postComment', () => {
  const config = new Config('test:unit');
  const database = new PrismaDatabase();
  const commentsRepo = new ProductionCommentsRepository(database);
  const postsRepo = new ProductionPostsRepository(database);
  const membersRepo = new ProductionMembersRepository(database);
  const eventBus = new InMemoryEventBus();
  const useCase = new PostComment(
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
