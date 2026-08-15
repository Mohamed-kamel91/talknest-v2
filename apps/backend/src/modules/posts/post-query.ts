import { Request } from 'express';

import { type GetPostsParams } from '@talknest/api/posts';
import {
  InvalidRequestQueryParamsError,
  MissingRequestQueryParamsError,
} from '@talknest/errors/request';

export class getPostsQuery {
  private constructor(public props: GetPostsParams) {}

  static fromRequest(query: Request['query']) {
    const { sort } = query;

    if (!sort) {
      throw new MissingRequestQueryParamsError(['sort']);
    }

    if (sort !== 'recent') {
      throw new InvalidRequestQueryParamsError(['sort']);
    }

    return new getPostsQuery({ sort });
  }

  get sort() {
    return this.props.sort;
  }
}
