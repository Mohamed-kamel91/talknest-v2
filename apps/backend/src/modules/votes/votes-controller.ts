import express from 'express';

import {
  VoteOnPostAPIResponse,
  VoteOnPostCommand,
} from '@talknest/api/votes';

import { VotesService } from './application/votes-service';

export class VotesController {
  constructor(private votesService: VotesService) {}

  public async castVoteOnPost(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) {
    try {
      const command = new VoteOnPostCommand({
        postId: req.params.postId as string,
        voteType: req.body.voteType,
        memberId: req.body.memberId,
      });

      const result = await this.votesService.castVoteOnPost(command);

      if (!result.isSuccess()) {
        return next(result.getError());
      }

      const postVote = result.getValue();
      const response: VoteOnPostAPIResponse = {
        success: true,
        statusCode: 200,
        data: postVote.toDTO(),
        error: null,
      };
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
