export interface RootState {
  version: number;
}

export interface RedditState {
  token: string;
  posts: Array<any>;
  lastPostName: string;
  postPerRequest: number;
}
