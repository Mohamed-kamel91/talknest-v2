import express from 'express';

import { GetPostsQuery } from '@talknest/api/posts';

import { BaseController } from '../../../../../shared/infra/http';
import { PostsService } from '../../../application/posts-service';

export class GetPostsController extends BaseController {
  constructor(private postsService: PostsService) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const queryOrError = GetPostsQuery.create(req.query);

    const result = await this.postsService.getPosts(
      queryOrError.getValue(),
    );

    const posts = result.map((p) => p.toDTO());

    this.ok(res, posts);
  }
}
