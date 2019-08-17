import { IPost } from 'src/app/models/post';
import { PostsAction, PostsActionsType } from './posts.actions';

export interface PostsState {
  list: IPost[];
  item: IPost;
  loading: boolean;
  error: string | boolean;
}

export const initialState: PostsState = {
  list: [],
  item: {} as IPost,
  loading: false,
  error: false
};

export function postsReducer(state: PostsState = initialState, action: PostsAction): PostsState {
  switch (action.type) {
    case PostsActionsType.LOAD_LIST:
    case PostsActionsType.UPDATE_ITEM:
    case PostsActionsType.CREATE_ITEM:  {
      return {
        ...state,
        loading: true
      };
    }
    case PostsActionsType.LIST_LOADED: {
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    }
    case PostsActionsType.LOAD_ITEM: {
      return {
        ...state,
        loading: true
      };
    }
    case PostsActionsType.ITEM_LOADED: {
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    }
    case PostsActionsType.ITEM_CREATED: {
      const item = action.payload;
      return {
        ...state,
        list: [item, ...state.list],
        item,
        loading: false
      };
    }
    case PostsActionsType.ITEM_UPDATED: {
      const item = action.payload;
      return {
        ...state,
        list: state.list.map((i) => i.id === item.id ? item : i),
        item,
        loading: false
      };
    }
    case PostsActionsType.CLEAR_ITEM: {
      return {
        ...state,
        item: {} as IPost,
        loading: false
      };
    }
    case PostsActionsType.LIST_LOADED: {
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    }
    case PostsActionsType.ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

export const getPosts = (state: PostsState) => state.list;
export const getItem = (state: PostsState) => state.item;
export const getLoading = (state: PostsState) => state.loading;
