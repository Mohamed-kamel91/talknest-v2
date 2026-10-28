import { PostVote } from "../../domain/post-vote";

export interface IPostVotesRepository {
  findByMemberAndPostId(memberId: string, postId: string): Promise<PostVote | null>;
  save(vote: PostVote): Promise<void>;
}
