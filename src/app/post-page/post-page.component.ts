import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState, getPostsLoading, getPostItem } from '../store';
import { LoadItem, DeleteItem } from '../store/posts/posts.actions';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../models/post';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$: Observable<IPost>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    const { postId }: { postId?: number} = this.route.snapshot.params;
    this.store.dispatch(new LoadItem(postId));
    this.loading$ = this.store.pipe(
      select(getPostsLoading)
    );
    this.post$ = this.store.pipe(
      select(getPostItem)
    );
  }

  deleteItem(id: number) {
    this.store.dispatch(new DeleteItem(id));
  }

}
