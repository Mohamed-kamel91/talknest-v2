import express from 'express';

import { VoteOnCommentCommand, VoteOnCommentDTO } from '@talknest/api/votes';

import { BaseController } from '../../../../../shared/infra/http';
import { VotesService } from '../../../application/votes-service';

export class voteOnCommentController extends BaseController {
  constructor(private readonly votesService: VotesService) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const payload = req.body;

    const commandOrError = VoteOnCommentCommand.create({ postId, commentId, ...payload });

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const resultOrError = await this.votesService.voteOnComment(commandOrError.getValue());

    if (resultOrError.isFailure) {
      return this.fail(res, resultOrError.getError());
    }

    const result = resultOrError.getValue();

    this.ok<VoteOnCommentDTO>(res, {
      commentId: result.commentId,
      voteStatus: result.voteStatus.value,
    });
  }
}
