import { type MarketingService } from '../../modules/marketing/application/marketing-service';
import { type NotificationsService } from '../../modules/notifications/application/notifications-service';
import { type PostsService } from '../../modules/posts/application/posts-service';
import { type UserIdentityService } from '../../modules/users/application/user-identity-service';
import { type VotesService } from '../../modules/votes/application/votes-service';

export interface Application {
  users: UserIdentityService;
  posts: PostsService;
  marketing: MarketingService;
  notifications: NotificationsService;
  votes: VotesService;
}
