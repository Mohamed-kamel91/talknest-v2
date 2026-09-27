import {
  success,
  fail,
  type Result,
  type IUseCase,
} from '@talknest/core/application';
import { CreatePostCommand } from '@talknest/api/posts';
import { type IEventBus } from '@talknest/bus';

import type { IMembersRepository } from '../../../../members/application/ports/members-repository';
import {
  InsufficientMemberLevelError,
  MemberNotFoundError,
} from '../../../../members/domain/errors/member-errors';

import type { IPostsRepository } from '../../ports/posts-repository';
import { CanCreatePostPolicy } from '../../../domain/policies/can-create-post';
import { CreatePostProps, Post } from '../../../domain/post';
import { PostCreationError } from '../../../domain/errors/posts-errors';
import { PostType } from '../../../domain/post-type';
import { PostTitle } from '../../../domain/post-title';
import { PostContent } from '../../../domain/post-content';
import { PostLink } from '../../../domain/post-link';

export type CreatePostError =
  | MemberNotFoundError
  | InsufficientMemberLevelError
  | PostCreationError;

export type CreatePostResponse = Result<Post, CreatePostError>;

export class CreatePostUseCase implements IUseCase<
  CreatePostCommand,
  CreatePostResponse
> {
  constructor(
    private postsRepository: IPostsRepository,
    private membersRepository: IMembersRepository,
    private eventBus: IEventBus,
  ) {}

  async execute(
    command: CreatePostCommand,
  ): Promise<CreatePostResponse> {
    const { memberId } = command.props;

    const member = await this.membersRepository.getById(memberId);
    if (!member) {
      return fail(new MemberNotFoundError());
    }

    if (!CanCreatePostPolicy.isAllowed(member)) {
      return fail(
        new InsufficientMemberLevelError(
          'You must be at least member level 2 to create a post.',
        ),
      );
    }

    const propsOrError = this.buildCreatePostProps(command);
    if (propsOrError.isFailure) {
      return fail(propsOrError.getError());
    }

    const postOrError = Post.create(propsOrError.getValue());
    if (postOrError.isFailure) {
      return fail(postOrError.getError());
    }

    const post = postOrError.getValue();

    await this.postsRepository.save(post);
    this.eventBus.publishEvents(post.getDomainEvents());

    return success(post);
  }

  private buildCreatePostProps(
    command: CreatePostCommand,
  ): Result<CreatePostProps, PostCreationError> {
    const { postType, title, memberId } = command.props;

    const postTypeOrError = PostType.create(postType);
    if (postTypeOrError.isFailure) {
      return fail(postTypeOrError.getError());
    }

    const postTitleOrError = PostTitle.create(title);
    if (postTitleOrError.isFailure) {
      return fail(postTitleOrError.getError());
    }

    const postTypeValue = postTypeOrError.getValue();
    const postTitle = postTitleOrError.getValue();

    if (postType === 'text') {
      const postContentOrError = PostContent.create(
        command.props.content,
      );

      if (postContentOrError.isFailure) {
        return fail(postContentOrError.getError());
      }

      return success({
        postType: postTypeValue,
        title: postTitle,
        memberId,
        content: postContentOrError.getValue(),
      });
    }

    const postLinkOrError = PostLink.create(command.props.link);
    if (postLinkOrError.isFailure) {
      return fail(postLinkOrError.getError());
    }

    return success({
      postType: postTypeValue,
      title: postTitle,
      memberId,
      link: postLinkOrError.getValue(),
    });
  }
}
