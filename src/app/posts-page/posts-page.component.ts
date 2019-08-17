import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../models/post';
import { Store, select } from '@ngrx/store';
import { LoadList } from '../store/posts/posts.actions';
import { AppState, getPosts, getPostsLoading } from '../store';

@Component({
  selector: 'app-posts-page',
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss']
})
export class PostsPageComponent implements OnInit {
  posts$: Observable<IPost[]>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadList());
    this.posts$ = this.store.pipe(
     select(getPosts)
    );

    this.loading$ = this.store.pipe(
      select(getPostsLoading)
    );
  }

}
