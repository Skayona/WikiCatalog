import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState, getPostsLoading, getPostItem } from '../store';
import { Observable } from 'rxjs';
import { IPost } from '../models/post';
import { LoadItem, UpdateItem, CreateItem } from '../store/posts/posts.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss']
})
export class CreatePostPageComponent implements OnInit {
  post$: Observable<IPost>;
  loading$: Observable<boolean>;

  isValidated: boolean;
  editMode: boolean;
  postForm: FormGroup;
  postId: number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    this.editMode = false;
    this.isValidated = false;
    this.postForm = this.fb.group({
      userId: [''],
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.postId = this.route.snapshot.params.postId;

    this.loading$ = this.store.pipe(
      select(getPostsLoading)
    );

    if (this.postId) {
      this.editMode = true;
      this.getItemData(this.postId);
    }
  }

  getItemData(postId: number) {
    this.store.dispatch(new LoadItem(postId));
    this.post$ = this.store.pipe(
      select(getPostItem)
    );

    this.post$.pipe(
      filter((post) => Object.keys(post).length > 0)
    ).subscribe((post) => {
      this.postForm.patchValue(post);
    });

  }

  onSubmit(e: Event) {
    this.isValidated = true;
    e.preventDefault();
    if (!this.postForm.get('userId').value) {
      const userId: number = (new Date()).getTime();
      this.postForm.get('userId').setValue(userId);
    }
    if (this.postForm.invalid) {
      return;
    }

    const post = this.postForm.value;

    if (this.editMode) {
      post.id = this.postId;
      this.store.dispatch(new UpdateItem(post));
    } else {
      this.store.dispatch(new CreateItem(post));
    }

  }
}
