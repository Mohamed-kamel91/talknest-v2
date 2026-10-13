import { DomainEvent } from '@talknest/core/domain';

type PostCreatedData = {
  postId: string;
  memberId: string;
};

export class PostCreated extends DomainEvent<PostCreatedData> {
  static readonly eventName = 'PostCreated';

  constructor(data: PostCreatedData) {
    super(PostCreated.eventName, data.postId, data);
  }
}
