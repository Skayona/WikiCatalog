import { PostsService } from 'src/app/services/posts.service';
import {
  PostsActionsType,
  ListLoaded,
  ItemLoaded,
  LoadItem,
  PostsError,
  CreateItem,
  ItemCreated,
  ItemUpdated,
  UpdateItem,
  DeleteItem,
  ItemDeleted
} from './posts.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, empty } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, take, pluck, mergeMap } from 'rxjs/operators';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import { IPost } from 'src/app/models/post';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class PostsEffects {
  getList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActionsType.LOAD_LIST),
      exhaustMap(() => {
        return this.store.pipe(
          pluck('posts', 'list'),
          take(1),
          switchMap((posts: IPost[]) => {
            if (posts.length) {
              return of(new ListLoaded(posts));
            }
            return this.postsService.getList().pipe(
              map((list) => new ListLoaded(list)),
              catchError((error: HttpErrorResponse) => of(new PostsError(error.statusText)))
            );
          })
        );
      })
    )
  );

  getItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActionsType.LOAD_ITEM),
      exhaustMap((action: LoadItem) => {
        return this.store.pipe(
          pluck('posts', 'list'),
          take(1),
          switchMap((posts: IPost[]) => {
            const postId = Number(action.payload);
            const postInList = posts.find((post) => post.id === postId);
            if (postInList) {
              return of(new ItemLoaded(postInList));
            }
            return this.postsService.getItem(postId).pipe(
              map((item) => new ItemLoaded(item)),
              catchError((error: HttpErrorResponse) => {
                if (error.status === 404) {
                  this.router.navigate(['/']);
                  return empty();
                }
                return of(new PostsError(error.statusText));
              })
            );
          })
        );
      })
    )
  );

  createItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActionsType.CREATE_ITEM),
      exhaustMap((action: CreateItem) => {
        const id = (new Date()).getTime();
        return this.postsService.addItem(action.payload).pipe(
          map((item) => {
            this.router.navigate(['posts', id, 'post']);
            return new ItemCreated({ ...item, id });
          }),
          catchError((error: HttpErrorResponse) => of(new PostsError(error.statusText)))
        );

      })
    )
  );

  updateItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostsActionsType.UPDATE_ITEM),
    exhaustMap((action: UpdateItem) => {
      const post = action.payload;
      const id = post.id > 100 ? 100 : Number(post.id);
      return this.postsService.updateItem({...post, id }).pipe(
        map((item) => {
          const postId = Number(post.id);
          this.router.navigate(['posts', postId, 'post']);
          return new ItemUpdated({ ...item, id: postId });
        }),
        catchError((error: HttpErrorResponse) => of(new PostsError(error.statusText))));
      })
    )
  );

  deleteItem$ = createEffect(() =>
  this.actions$.pipe(
    ofType(PostsActionsType.DELETE_ITEM),
    exhaustMap((action: DeleteItem) => {
      const id = action.payload > 100 ? 101 : Number(action.payload);
      return this.postsService.deleteItem(id).pipe(
        map(() => {
          const postId = Number(action.payload);
          this.router.navigate(['posts']);
          return new ItemDeleted(postId);
        }),
        catchError((error: HttpErrorResponse) => of(new PostsError(error.statusText))));
      })
    )
  );

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private actions$: Actions,
    private postsService: PostsService
  ) {}
}
