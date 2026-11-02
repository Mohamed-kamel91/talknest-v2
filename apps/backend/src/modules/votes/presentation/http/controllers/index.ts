import { VotesService } from '../../../application/votes-service';
import { voteOnPostController } from './vote-on-post';
import { voteOnCommentController } from './vote-on-comment';

export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  public voteOnPost() {
    return new voteOnPostController(this.votesService);
  }

  public voteOnComment() {
    return new voteOnCommentController(this.votesService);
  }
}
