import express from 'express';

import {
  GetPostsQuery,
  GetPostByIdQuery,
  CreatePostCommand,
} from '@talknest/api/posts';

import { BaseController } from '../../shared/infra/http';
import { type PostsService } from './application/posts-service';

export class PostsController extends BaseController {
  constructor(private postsService: PostsService) {
    super();
  }

  public async createPost(
    req: express.Request,
    res: express.Response,
  ) {
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

    return this.ok(res, postDetailsResult.getValue().toDTO());
  }

  public async getPosts(req: express.Request, res: express.Response) {
    const queryOrError = GetPostsQuery.create(req.query);

    const result = await this.postsService.getPosts(
      queryOrError.getValue(),
    );

    const posts = result.map((p) => p.toDTO());

    return this.ok(res, posts);
  }

  public async getPostById(
    req: express.Request,
    res: express.Response,
  ) {
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

    return this.ok(res, result.getValue().toDTO());
  }
}
