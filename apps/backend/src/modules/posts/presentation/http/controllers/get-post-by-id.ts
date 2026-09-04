import express from 'express';

import { GetPostByIdQuery } from '@talknest/api/posts';

import { BaseController } from '../../../../../shared/infra/http';
import { PostsService } from '../../../application/posts-service';

export class GetPostByIdController extends BaseController {
  constructor(private postsService: PostsService) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const params = req.query || req.params;

    const queryOrError = GetPostByIdQuery.create(params);

    if (queryOrError.isFailure) {
      return this.fail(res, queryOrError.getError());
    }

    const result = await this.postsService.getPostDetailsById(
      queryOrError.getValue().props.postId,
    );

    if (result.isFailure) {
      return this.fail(res, result.getError());
    }

    this.ok(res, result.getValue().toDTO());
  }
}
