import { APIClient } from '@talknest/api';
import { MemberDTO } from '@talknest/api/members';
import { PostDTO, CreatePostInput } from '@talknest/api/posts';

export async function setupPost(
  apiClient: APIClient,
  member: MemberDTO,
  authToken: string,
) {
  const postData: CreatePostInput = {
    memberId: member.memberId,
    title: 'A new post',
    postType: 'text',
    content: 'This is a new text post that I am creating!',
  };

  const response = await apiClient.posts.create(postData, authToken);

  expect(response).toBeDefined();
  expect(response.success).toBe(true);
  return { post: response.data as PostDTO };
}
