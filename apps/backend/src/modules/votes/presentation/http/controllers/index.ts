import { VotesService } from '../../../application/votes-service';
import { VoteOnPostController } from './vote-on-post';

export class VotesController {
  constructor(private votesService: VotesService) {}

  public castVoteOnPost(): VoteOnPostController {
    return new VoteOnPostController(this.votesService);
  }
}
