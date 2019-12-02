export interface RootState {
  version: number;
}

export interface RedditState {
  token: string;
  posts: Array<RedditPost>;
  lastPostName: string;
  postPerRequest: number;
}

export interface RedditPost {
  title: string;
  author: string;
  entryDate: string;
  thumbnail: {
    uri: string;
    height: string;
    width: string;
  };
  comments: number;
  unreadStatus: string;
}
