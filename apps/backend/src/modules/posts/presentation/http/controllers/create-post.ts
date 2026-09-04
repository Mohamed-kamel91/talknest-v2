import express from 'express';

import { CreatePostCommand } from '@talknest/api/posts';

import { BaseController } from '../../../../../shared/infra/http';
import { PostsService } from '../../../application/posts-service';

export class CreatePostController extends BaseController {
  constructor(private postsService: PostsService) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const commandOrError = CreatePostCommand.create(req.body);

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const createPostresult = await this.postsService.createPost(
      commandOrError.getValue(),
    );

    if (createPostresult.isFailure) {
      return this.fail(res, createPostresult.getError());
    }

    const newPost = createPostresult.getValue();

    const postDetailsResult =
      await this.postsService.getPostDetailsById(newPost.id);

    if (postDetailsResult.isFailure) {
      return this.fail(res, postDetailsResult.getError());
    }

    this.ok(res, postDetailsResult.getValue().toDTO());
  }
}
