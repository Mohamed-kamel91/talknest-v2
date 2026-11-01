import express from 'express';

import { VoteOnPostCommand, type VoteOnPostDTO } from '@talknest/api/votes';

import { BaseController } from '../../../../../shared/infra/http';
import { VotesService } from '../../../application/votes-service';

export class voteOnPostController extends BaseController {
  constructor(private votesService: VotesService) {
    super();
  }

  async executeImpl(req: express.Request, res: express.Response) {
    const postId = req.params.postId;
    const payload = req.body;

    const commandOrError = VoteOnPostCommand.create({ postId, ...payload });

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const resultOrError = await this.votesService.voteOnPost(commandOrError.getValue());

    if (resultOrError.isFailure) {
      return this.fail(res, resultOrError.getError());
    }

    const result = resultOrError.getValue();

    this.ok<VoteOnPostDTO>(res, {
      postId: result.postId,
      voteStatus: result.voteStatus,
    });
  }
}
