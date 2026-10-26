import { VotesService } from '../../../application/votes-service';
import { CastVoteOnCommentController } from './vote-on-comment';
import { CastVoteOnPostController } from './vote-on-post';

export class VotesController {
  constructor(private votesService: VotesService) {}

  public castVoteOnPost(): CastVoteOnPostController {
    return new CastVoteOnPostController(this.votesService);
  }

  public castVoteOnComment(): CastVoteOnCommentController {
    return new CastVoteOnCommentController(this.votesService);
  }
}
