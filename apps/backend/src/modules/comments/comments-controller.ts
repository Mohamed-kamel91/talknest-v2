import express from 'express';

import { PostCommentCommand } from '@talknest/api/comments';

import { CommentsService } from './application/comments-service';

export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  public async getCommentsByPostId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const postId = req.params.postId;

      const result = await this.commentsService.getCommentsByPostId(
        postId as string,
      );

      if (result.isFailure()) {
        return res.status(404).json({
          success: false,
          error: {
            message: 'Comments not found',
            code: 'COMMENTS_NOT_FOUND',
          },
        });
      }

      return res.json({
        success: true,
        data: result.getValue(),
      });
    } catch (error) {
      next(error);
    }
  }

  public async postComment(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const commandOrError = PostCommentCommand.fromRequest(
        req.body,
        req.user,
      );

      if (commandOrError.isFailure()) {
        return res.status(400).json({
          success: false,
          error: {
            message: 'Missing required parameters',
            code: 'MISSING_PARAMS',
          },
        });
      }

      const result = await this.commentsService.postComment(
        commandOrError.getValue(),
      );

      if (result.isFailure()) {
        const error = result.getError();

        if (error instanceof Error && error.name === 'PostNotFound') {
          return res.status(404).json({
            success: false,
            error: {
              message: 'Post not found',
              code: 'POST_NOT_FOUND',
            },
          });
        }

        return res.status(400).json({
          success: false,
          error: {
            message: 'Invalid comment',
            code: 'INVALID_COMMENT',
          },
        });
      }

      return res.json({
        success: true,
        data: result.getValue(),
      });
    } catch (error) {
      next(error);
    }
  }
}
