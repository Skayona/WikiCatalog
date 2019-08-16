import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { CreatePostPageComponent } from './create-post-page/create-post-page.component';


const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'posts'
  },
  {
    path: 'posts',
    data: {
      breadcrumbs: 'Posts'
    },
    children: [
      {
        path: '',
        component: PostsPageComponent
      },
      {
        path: ':postId/post',
        data: {
          breadcrumbs: 'Post'
        },
        children: [
          {
            path: '',
            component: PostPageComponent
          },
          {
            path: 'edit',
            component: CreatePostPageComponent,
            data: {
              breadcrumbs: 'Edit'
            }
          }
        ]
      },
      {
        path: 'create',
        component: CreatePostPageComponent,
        data: {
          breadcrumbs: 'Create'
        }
      },
    ]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
