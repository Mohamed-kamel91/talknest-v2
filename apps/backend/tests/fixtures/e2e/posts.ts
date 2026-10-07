import { type APIClient } from '@talknest/api';
import { CreatePostInput } from '@talknest/api/posts';

import {
  BasePostInputBuilder,
  CreatePostInputBuilder,
} from '../../builders/create-post-input-builder';

type SetupPostProps = {
  apiClient: APIClient;
  memberId: string;
  authToken: string;
};

async function setupPost<TInput extends CreatePostInput>(
  { apiClient, memberId, authToken }: SetupPostProps,
  createPostInputBuilder: () => BasePostInputBuilder<TInput>,
) {
  const postInput = createPostInputBuilder()
    .withMemberId(memberId)
    .build();

  const response = await apiClient.posts.create(postInput, authToken);

  if (!response.success) {
    throw new Error(
      `Failed to create post: ${response.error.code} - ${response.error.message}`,
    );
  }

  expect(response.data?.id).toBeDefined();
  expect(response.data?.slug).toBeDefined();

  return { post: response.data, postInput };
}

export const setupTextPost = (props: SetupPostProps) => {
  return setupPost(props, () => CreatePostInputBuilder.aTextPost());
};

export const setupLinkPost = (props: SetupPostProps) => {
  return setupPost(props, () => CreatePostInputBuilder.aLinkPost());
};
