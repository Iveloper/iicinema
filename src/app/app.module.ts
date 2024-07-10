import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowsComponent } from './shows/shows.component';
import { NewsComponent } from './news/news.component';
import { ActorsComponent } from './actors/actors.component';
import { SymbolSeparatingPipe } from './pipes/symbol-separating.pipe';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MinutesToHoursPipe } from 'src/app/pipes/minutes-to-hours.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { EssentialIdPartPipe } from 'src/app/pipes/essential-id-part.pipe';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltersComponent } from './filters/filters.component';
import { LandingComponent } from './landing/landing.component';
import { SpaceBigIntegersPipe } from './pipes/space-big-integers.pipe';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FooterComponent } from './footer/footer.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { GenresComponent } from './genres/genres.component';
import { GenreTitlesComponent } from './genre-titles/genre-titles.component';
import { RegistrationResultDialogComponent } from './registration-result-dialog/registration-result-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileComponent } from './profile/profile.component';
import { FavoritesDialogComponent } from './favorites-dialog/favorites-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';
import { EditReviewNewsDialogComponent } from './edit-review-news-dialog/edit-review-news-dialog.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCreateComponent } from './article-create/article-create.component';
import { EditArticleCommentsDialogComponent } from './edit-article-comments-dialog/edit-article-comments-dialog.component';
import { ShowsMoviesReviewsComponent } from './shows-movies-reviews/shows-movies-reviews.component';
import { EditArticleContentDialogComponent } from './edit-article-content-dialog/edit-article-content-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ShowsComponent,
    NewsComponent,
    ActorsComponent,
    SymbolSeparatingPipe,
    MinutesToHoursPipe,
    EssentialIdPartPipe,
    MovieDetailComponent,
    MainMenuComponent,
    ShowDetailComponent,
    ActorDetailComponent,
    SearchBarComponent,
    FiltersComponent,
    LandingComponent,
    SpaceBigIntegersPipe,
    FooterComponent,
    LoginComponent,
    RegistrationComponent,
    GenresComponent,
    GenreTitlesComponent,
    RegistrationResultDialogComponent,
    ProfileComponent,
    FavoritesDialogComponent,
    ConfirmDeleteDialogComponent,
    EditReviewNewsDialogComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    ArticleCreateComponent,
    EditArticleCommentsDialogComponent,
    ShowsMoviesReviewsComponent,
    EditArticleContentDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    RegistrationResultDialogComponent,
    FavoritesDialogComponent
  ],
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
