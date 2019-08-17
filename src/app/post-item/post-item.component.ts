import { Component, Input } from '@angular/core';
import { IPost } from '../models/post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() post: IPost;
}
