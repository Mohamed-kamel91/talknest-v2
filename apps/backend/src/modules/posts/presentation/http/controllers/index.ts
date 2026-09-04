import { PostsService } from '../../../application/posts-service';

import { CreatePostController } from './create-post';
import { GetPostsController } from './get-posts';
import { GetPostByIdController } from './get-post-by-id';

export class PostsController {
  constructor(private postsService: PostsService) {}

  public createPost(): CreatePostController {
    return new CreatePostController(this.postsService);
  }

  public getPosts(): GetPostsController {
    return new GetPostsController(this.postsService);
  }

  public getPostById(): GetPostByIdController {
    return new GetPostByIdController(this.postsService);
  }
}
