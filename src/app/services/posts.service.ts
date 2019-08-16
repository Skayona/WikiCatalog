import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IPost } from '../models/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  api: string;

  constructor(
    private http: HttpClient
  ) {
    this.api = environment.API;
   }

  getList(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${ this.api }/posts`);
  }

  getItem(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.api }/posts/${ id }`);
  }

  addItem(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${ this.api }/posts/`, post, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  updateItem(post: IPost): Observable<IPost>  {
    return this.http.put<IPost>(`${ this.api }/posts/${ post.id }`, post, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }

  deleteItem(id: number): Observable<any>  {
    return this.http.delete(`${ this.api }/posts/${ id }`);
  }
}
