import express from 'express';

import { PostCommentCommand } from '@talknest/api/comments';

import { CommentsService } from './application/comments-service';
import { BaseController } from '../../shared/infra/http';

export class CommentsController extends BaseController {
  constructor(private commentsService: CommentsService) {
    super();
  }

  public async getCommentsByPostId(
    req: express.Request,
    res: express.Response,
  ) {
    const postId = req.params.postId;

    const result = await this.commentsService.getCommentsByPostId(
      postId as string,
    );

    if (result.isFailure()) {
      return this.fail(res, result.getError());
    }

    return this.ok(res, result.getValue());
  }

  public async postComment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    const command = PostCommentCommand.fromRequest(
      req.body,
      req.user,
    );

    if (command.isFailure()) {
      return this.fail(res, command.getError());
    }

    const result = await this.commentsService.postComment(
      command.getValue(),
    );

    if (result.isFailure()) {
      return this.fail(res, result.getError());
    }

    return this.created(res, result.getValue());
  }
}
