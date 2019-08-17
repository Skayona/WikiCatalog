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
  UpdateItem
} from './posts.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, take, pluck, mergeMap } from 'rxjs/operators';
import { AppState } from '..';
import { Store } from '@ngrx/store';
import { IPost } from 'src/app/models/post';
import { Router, ActivatedRoute } from '@angular/router';

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
              catchError((error) => of(new PostsError(error)))
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
              catchError((error) => of(new PostsError(error)))
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
            this.router.navigate(['posts']);
            return new ItemCreated({ ...item, id });
          }),
          catchError((error) => of(new PostsError(error)))
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
        catchError((error) => of(new PostsError(error)))
      );
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
