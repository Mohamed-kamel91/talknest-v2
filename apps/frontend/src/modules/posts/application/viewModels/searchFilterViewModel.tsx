import { GetPostsQueryOption } from '@talknest/api/posts';

export type PostsFilterValue = GetPostsQueryOption;

export class SearchFilterViewModel {
  private _value: PostsFilterValue;

  constructor(value: PostsFilterValue) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
