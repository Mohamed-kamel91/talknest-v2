import express from 'express';

import { GetPostsQuery } from '@talknest/api/posts';

import { BaseController } from '../../../../../shared/infra/http';
import { type PostsService } from '../../../application/posts-service';

export class GetPostsController extends BaseController {
  constructor(private postsService: PostsService) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const queryOrError = GetPostsQuery.create(req.query);

    const resultOrError = await this.postsService.getPosts(
      queryOrError.getValue(),
    );

    const posts = resultOrError.getValue().map((p) => p.toDTO());

    this.ok(res, posts);
  }
}
