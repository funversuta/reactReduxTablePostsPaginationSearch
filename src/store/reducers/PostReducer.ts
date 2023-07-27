import { PostAction, PostActionTypes, PostState } from "../../types/post";

const initialState: PostState = {
  Posts: [],
  page: 1,
  error: null,
  limit: 10,
  loading: false,
  StandartPosts: [],
};

export const PostReducer = (
  state = initialState,
  action: PostAction
): PostState => {
  switch (action.type) {
    case PostActionTypes.FETCH_POSTS:
      return { ...state, loading: true };
    case PostActionTypes.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        Posts: action.payload,
        StandartPosts: action.StandartPosts,
      };
    case PostActionTypes.FILTER_POSTS_REVERSE:
      return { ...state, loading: false, Posts: action.payload };
    case PostActionTypes.FILTER_POSTS:
      return {
        ...state,
        loading: false,
        Posts: action.payload,
        StandartPosts: action.StandartPosts,
      };
    case PostActionTypes.FETCH_POSTS_ERROR:
      return { ...state, loading: false, error: action.payload };
    case PostActionTypes.SET_POSTS_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
