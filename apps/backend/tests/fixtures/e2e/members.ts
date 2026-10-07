import { NumberUtil } from '@talknest/core/utils';
import { type APIClient } from '@talknest/api';

import { DatabaseFixture } from './database';
import { Member } from '../../../src/modules/members/domain/member';

export async function setupLevel1Member(
  apiClient: APIClient,
  authToken: string,
  userId: string,
) {
  const username = `moh${NumberUtil.generateRandomInteger(10000, 99999)}`;

  const response = await apiClient.members.register(
    {
      username,
      userId,
    },
    authToken,
  );

  if (!response.success) {
    throw new Error(`Failed to create member: ${response.error}`);
  }

  expect(response.data).toBeDefined();
  expect(response.data?.id).toBeDefined();
  expect(response.data?.userId).toBeDefined();
  expect(response.data?.username).toBeDefined();

  console.log(`Created a Level 1 member`);

  return { member: response.data };
}

export async function setupLevel2Member(
  apiClient: APIClient,
  authToken: string,
  userId: string,
  databaseFixture: DatabaseFixture,
) {
  const { member } = await setupLevel1Member(
    apiClient,
    authToken,
    userId,
  );

  // Seed lvl2 member for seeded post
  const author = await databaseFixture.seedMember({
    reputationLevel: 'Level2',
    reputationScore: Member.REPUTATION_SCORE_THRESH.Level2,
  });

  // seed post
  await databaseFixture.seedPost({
    memberId: author.id,
  });

  // Get all posts
  const postsResponse = await apiClient.posts.getPosts({
    sort: 'recent',
  });
  if (!postsResponse.success || !postsResponse.data) {
    throw new Error('Failed to get posts');
  }

  // Find a post to comment on
  const postToCommentOn = postsResponse.data[0];
  if (!postToCommentOn) {
    throw new Error('No posts found to comment on');
  }

  // Post a comment to the post x5 times
  for (let i = 0; i < 5; i++) {
    const commentResponse = await apiClient.comments.postComment(
      {
        postId: postToCommentOn.id,
        memberId: member.id,
        text: `Test comment ${i + 1}`,
      },
      authToken,
    );

    if (!commentResponse.success) {
      throw new Error('Failed to post comment');
    }
  }

  // Verify that the member is now level 2 by checking the database via the fixture
  const updatedMember = await databaseFixture.getMemberById(
    member.id,
  );
  if (!updatedMember) {
    throw new Error('Failed to verify member level');
  }

  // Wait for 3 seconds before checking the reputation level
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return { member };
}
