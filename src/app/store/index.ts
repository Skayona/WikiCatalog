import { PostsEffects } from './posts/posts.effects';
import { ActionReducerMap, ActionReducer, MetaReducer, createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPosts from './posts/posts.reducer';

export interface AppState {
  posts: fromPosts.PostsState;
}

export const effects = [
  PostsEffects
];

export const reducers: ActionReducerMap<AppState> = {
  posts: fromPosts.postsReducer
};


export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return (state: AppState, action: any): AppState => {
    const newState = reducer(state, action);
    console.log('posts', newState.posts);

    return newState;
  };
}


export const metaReducers: MetaReducer<AppState>[] = [logger];

const getPostsModuleFeature = createFeatureSelector('posts');
export const getPosts = createSelector(getPostsModuleFeature, fromPosts.getPosts);
export const getPostItem = createSelector(getPostsModuleFeature, fromPosts.getItem);
export const getPostsLoading = createSelector(getPostsModuleFeature, fromPosts.getLoading);
