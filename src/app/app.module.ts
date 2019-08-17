import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { PostPageComponent } from './post-page/post-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { CreatePostPageComponent } from './create-post-page/create-post-page.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { PostItemComponent } from './post-item/post-item.component';
import { LoadingDirective } from './directives/loading.directive';
import { PostActionsComponent } from './post-actions/post-actions.component';

@NgModule({
  declarations: [
    AppComponent,
    PostsPageComponent,
    PostPageComponent,
    NotFoundPageComponent,
    CreatePostPageComponent,
    BreadcrumbsComponent,
    PostItemComponent,
    LoadingDirective,
    PostActionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
