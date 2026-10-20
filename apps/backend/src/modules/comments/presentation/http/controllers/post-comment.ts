import express from 'express';

import { PostCommentCommand } from '@talknest/api/comments';

import { BaseController } from '../../../../../shared/infra/http';
import { CommentsService } from '../../../application/comments-service';

export class PostCommentController extends BaseController {
  constructor(private commentsService: CommentsService) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const postId = req.params.postId as string;

    const commandOrError = PostCommentCommand.create({
      ...req.body,
      postId,
    });

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const resultOrError = await this.commentsService.postComment(
      commandOrError.getValue(),
    );

    if (resultOrError.isFailure) {
      return this.fail(res, resultOrError.getError());
    }

    this.created(res, resultOrError.getValue());
  }
}
