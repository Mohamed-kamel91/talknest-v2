import express from 'express';

import { VoteOnPostCommand } from '@talknest/api/votes';

import { BaseController } from '../../shared/infra/http';
import { VotesService } from './application/votes-service';

export class VotesController extends BaseController {
  constructor(private votesService: VotesService) {
    super();
  }

  public async castVoteOnPost(
    req: express.Request,
    res: express.Response,
  ) {
    const commandOrError = VoteOnPostCommand.create({
      postId: req.params.postId as string,
      voteType: req.body.voteType,
      memberId: req.body.memberId,
    });

    if (commandOrError.isFailure) {
      return this.fail(res, commandOrError.getError());
    }

    const result = await this.votesService.castVoteOnPost(
      commandOrError.getValue(),
    );

    if (result.isFailure) {
      return this.fail(res, result.getError());
    }

    return this.ok(res, result.getValue().toDTO());
  }
}
