import { Action } from '@ngrx/store';
import { IPost } from 'src/app/models/post';

export enum PostsActionsType {
  LOAD_LIST = '[Posts] load list',
  LIST_LOADED = '[Posts] list loaded',
  LOAD_ITEM = '[Posts] load item',
  ITEM_LOADED = '[Posts] item loaded',
  CREATE_ITEM = '[Posts] create item',
  ITEM_CREATED = '[Posts] item created',
  UPDATE_ITEM = '[Posts] update item',
  ITEM_UPDATED = '[Posts] item updated',
  CLEAR_ITEM = '[Posts] clear item',
  DELETE_ITEM = '[Posts] delete item',
  ITEM_DELETED = '[Posts] item deleted',
  ERROR = '[Posts] load error'
}

export class LoadList implements Action {
  readonly type = PostsActionsType.LOAD_LIST;
}

export class ListLoaded implements Action {
  readonly type = PostsActionsType.LIST_LOADED;

  constructor(public payload: IPost[]) { }
}

export class LoadItem implements Action {
  readonly type = PostsActionsType.LOAD_ITEM;

  constructor(public payload: number) { }
}

export class ItemLoaded implements Action {
  readonly type = PostsActionsType.ITEM_LOADED;

  constructor(public payload: IPost) { }
}

export class CreateItem implements Action {
  readonly type = PostsActionsType.CREATE_ITEM;

  constructor(public payload: IPost) { }
}

export class ItemCreated implements Action {
  readonly type = PostsActionsType.ITEM_CREATED;

  constructor(public payload: IPost) { }
}

export class UpdateItem implements Action {
  readonly type = PostsActionsType.UPDATE_ITEM;

  constructor(public payload: IPost) { }
}

export class ItemUpdated implements Action {
  readonly type = PostsActionsType.ITEM_UPDATED;

  constructor(public payload: IPost) { }
}

export class ClearItem implements Action {
  readonly type = PostsActionsType.CLEAR_ITEM;

  constructor(public payload: IPost) { }
}

export class DeleteItem implements Action {
  readonly type = PostsActionsType.DELETE_ITEM;

  constructor(public payload: number) { }
}

export class ItemDeleted implements Action {
  readonly type = PostsActionsType.ITEM_DELETED;

  constructor(public payload: number) { }
}

export class PostsError implements Action {
  readonly type = PostsActionsType.ERROR;

  constructor(public payload: string) { }
}

export type PostsAction =
  | LoadList
  | ListLoaded
  | LoadItem
  | ItemLoaded
  | CreateItem
  | ItemCreated
  | UpdateItem
  | ItemUpdated
  | ClearItem
  | DeleteItem
  | ItemDeleted
  | PostsError;
