import { v4 as uuidv4 } from 'uuid';

import { createAPIClient } from '@talknest/api';
import { memberErrorCodes, postErrorCodes } from '@talknest/errors';

import { CompositionRoot } from '../../../src/shared/composition-root';
import { Config } from '../../../src/shared/config';
import { httpStatus } from '../../../src/shared/infra/http';

import { DatabaseFixture } from '../../fixtures/e2e/database';
import {
  createFakeAuthTokenAndUser,
  createFakeIdToken,
} from '../../fixtures/e2e/users';
import {
  setupLevel1Member,
  setupLevel2Member,
} from '../../fixtures/e2e/members';
import { setupTextPost } from '../../fixtures/e2e/posts';
import { CreatePostInputBuilder } from '../../builders/create-post-input-builder';
import { Member } from '../../../src/modules/members/domain/member';

jest.setTimeout(30000);

describe('posts', () => {
  let databaseFixture: DatabaseFixture;
  let appComposition: CompositionRoot;

  const config: Config = new Config('test:e2e');
  const apiClient = createAPIClient({ baseURL: process.env.API_URL });

  beforeAll(async () => {
    appComposition = CompositionRoot.create(config);
    databaseFixture = new DatabaseFixture(appComposition);

    await appComposition.start();
  });

  afterAll(async () => {
    await appComposition.stop();
  });

  beforeEach(async () => {
    await databaseFixture.resetDatabase();
  });

  describe('identity & permissions', () => {
    it('should not be able to create a post if they are level 1', async () => {
      const { userId, token } = await createFakeAuthTokenAndUser();
      const { member } = await setupLevel1Member(apiClient, token, userId);

      const createPostInput = CreatePostInputBuilder.aTextPost()
        .withMemberId(member.id)
        .build();

      const response = await apiClient.posts.create(createPostInput, token);

      expect(response.success).toBe(false);
      expect(response.status).toBe(httpStatus.FORBIDDEN);
      expect(response.data).toBeNull();
      expect(response.error?.code).toBe(
        memberErrorCodes.INSUFFICIENT_MEMBER_LEVEL,
      );
    });
  });

  describe('creating new posts', () => {
    it('it should create a link post as a level 2 member', async () => {
      const { token, userId } = await createFakeIdToken();

      const { member } = await setupLevel2Member(
        apiClient,
        token,
        userId,
        databaseFixture,
      );

      const linkPostInput = CreatePostInputBuilder.aLinkPost()
        .withMemberId(member.id)
        .build();

      const response = await apiClient.posts.create(linkPostInput, token);
      expect(response.success).toBe(true);
      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.error).toBe(null);
      expect(response.data).toBeDefined();
      expect(response.data?.id).toBeDefined();

      const createdPost = await databaseFixture.getPostById(response.data!.id);
      expect(createdPost).not.toBeNull();
      expect(createdPost?.postType).toBe('link');
      expect(createdPost?.link).toBe(linkPostInput.link);
      expect(createdPost?.content).toBeNull();
      expect(createdPost?.memberId).toBe(member.id);
    });

    // it('cannot create a link post without supplying a link', async () => {
    //   // Implement
    //   throw new Error('Not yet implemented');
    // });

    // it('cannot create a text post without supplying content', async () => {
    //   // Implement
    //   throw new Error('Not yet implemented');
    // });

    // it('should have an initial upvote when creating a post', async () => {
    //   // Implement
    //   throw new Error('Not yet implemented');
    // }, 15000); // Set test timeout to 15 seconds
  });

  describe('fetching posts', () => {
    it('can fetch a previously created post by id', async () => {
      const { token, userId } = await createFakeIdToken();

      const member = await databaseFixture.seedMember({
        userId,
        reputationLevel: 'Level2',
        reputationScore: Member.REPUTATION_SCORE_THRESH.Level2,
      });

      const { post, postInput } = await setupTextPost({
        apiClient,
        memberId: member.id,
        authToken: token,
      });

      const response = await apiClient.posts.getPostById(post.id);

      expect(response.success).toBe(true);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.error).toBeNull();
      expect(response.data).toMatchObject({
        id: post.id,
        member: { id: member.id },
        title: postInput.title,
        content: postInput.content,
        postType: postInput.postType,
      });
    });

    it('returns a not found error if the post does not exist', async () => {
      const nonExistentPostId = uuidv4();

      const response = await apiClient.posts.getPostById(nonExistentPostId);

      expect(response.success).toBe(false);
      expect(response.status).toBe(httpStatus.NOT_FOUND);
      expect(response.data).toBeNull();
      expect(response.error?.code).toBe(postErrorCodes.POST_NOT_FOUND);
      expect(response.error?.message).toBeDefined();
    });

    it('can fetch "recent" posts', () => {
      // Not yet implemented
      throw new Error('Not yet implemented');
    });

    it('can fetch "popular" posts', () => {
      // Not yet implemented
      throw new Error('Not yet implemented');
    });
  });

  // describe('incentives for posting / membership updates', () => {
  //   it('should trigger a member reputation upgrade if the member posts 5 posts, going from level 2 to level 3', async () => {
  //     // Implement
  //     throw new Error('Not yet implemented');
  //   }, 20000);
  // });
});
