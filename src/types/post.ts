export interface PostState {
  Posts: any[];
  loading: boolean;
  error: null | string;
  page: number;
  limit: number;
  StandartPosts: any[];
}

export enum PostActionTypes {
  FETCH_POSTS = "FETCH_POSTS",
  FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS",
  FETCH_POSTS_ERROR = "FETCH_POSTS_ERROR",
  SET_POSTS_PAGE = "SET_POSTS_PAGE",
  FILTER_POSTS_REVERSE = "FILTER_POSTS_REVERSE",
  FILTER_POSTS = "FILTER_POSTS",
}
interface FetchPostAction {
  type: PostActionTypes.FETCH_POSTS;
}
interface FetchPostSuccessAction {
  type: PostActionTypes.FETCH_POSTS_SUCCESS;
  payload: any[];
  StandartPosts: any[];
}
interface FetchPostErrorAction {
  type: PostActionTypes.FETCH_POSTS_ERROR;
  payload: string;
}
interface SetPostPage {
  type: PostActionTypes.SET_POSTS_PAGE;
  payload: number;
}

interface FilterPostsReverse {
  type: PostActionTypes.FILTER_POSTS_REVERSE;
  payload: any[];
}

interface FilterPosts {
  type: PostActionTypes.FILTER_POSTS;
  payload: any[];
  StandartPosts: any[];
}

export type PostAction =
  | FetchPostAction
  | FetchPostErrorAction
  | FetchPostSuccessAction
  | SetPostPage
  | FilterPostsReverse
  | FilterPosts;
