import express from 'express';

import {
  GetPostsQuery,
  GetPostByIdQuery,
  CreatePostCommand,
  type GetPostsAPIResponse,
  PostDTO,
} from '@talknest/api/posts';

import { type PostsService } from './application/posts-service';
import { type SuccessResponse } from '@talknest/api';

export class PostsController {
  constructor(private postsService: PostsService) {}

  public async getPosts(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const query = GetPostsQuery.fromRequest(req.query);

      const posts = await this.postsService.getPosts(query);

      const response: GetPostsAPIResponse = {
        success: true,
        statusCode: 200,
        data: posts.map((p) => p.toDTO()),
        error: null,
      };

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  public async createPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const commandOrError = CreatePostCommand.fromRequest(req.body);

      if (!commandOrError.isSuccess()) {
        return next(commandOrError.getError());
      }

      const result = await this.postsService.createPost(
        commandOrError.getValue(),
      );

      if (!result.isSuccess()) {
        return next(result.getError());
      }

      const newPost = result.getValue();

      const postDetails = await this.postsService.getPostDetailsById(
        newPost.id,
      );

      const response: SuccessResponse<PostDTO | null> = {
        success: true,
        statusCode: 200,
        data: postDetails?.getValue().toDTO() ?? null,
        error: null,
      };

      return res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  public async getPostById(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const query = GetPostByIdQuery.fromRequest(req);

      const postResult = await this.postsService.getPostDetailsById(
        query.postId,
      );

      if (!postResult.isSuccess) {
        return next(postResult.getError());
      }

      return res.status(200).json({
        success: true,
        statusCode: 200,
        data: postResult.getValue().toDTO(),
        error: null,
      });
    } catch (error) {
      next(error);
    }
  }
}
