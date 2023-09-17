import { GenresComponent } from './genres/genres.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorDetailComponent } from 'src/app/actor-detail/actor-detail.component';
import { ActorsComponent } from 'src/app/actors/actors.component';
import { LandingComponent } from 'src/app/landing/landing.component';
import { MovieDetailComponent } from 'src/app/movie-detail/movie-detail.component';
import { MoviesComponent } from 'src/app/movies/movies.component';
import { ShowDetailComponent } from 'src/app/show-detail/show-detail.component';
import { ShowsComponent } from 'src/app/shows/shows.component';
import { GenreTitlesComponent } from './genre-titles/genre-titles.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      show: true,
      title: 'navigation.home',
      icon: 'home'
    }
  },
  {
    path: 'movies',
    component: MoviesComponent,
    data: {
      show: true,
      title: 'navigation.movies',
      icon: 'movie'
    }
  },
  {
    path: 'movies/title/:id',
    component: MovieDetailComponent,
    data: {
      show: false
    }
  },
  {
    path: 'shows',
    component: ShowsComponent,
    data: {
      show: true,
      title: 'navigation.tv_shows',
      icon: 'tv'
    }
  },
  {
    path: 'shows/title/:id',
    component: ShowDetailComponent,
    data: {
      show: false
    }
  },
  {
    path: 'actors',
    component: ActorsComponent,
    data: {
      show: true,
      title: 'navigation.actors',
      icon: 'recent_actors'
    }
  },
  {
    path: 'actors/name/:id',
    component: ActorDetailComponent,
    data: {
      show: false
    }
  },
  {
    path: 'genres',
    component: GenresComponent,
    data: {
      show: true,
      title: 'navigation.genres',
      icon: 'theaters'
    }
  },
  {
    path: 'genre/:genre',
    component: GenreTitlesComponent,
    data: {
      show: false,
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      show: false
    }
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    data: {
      show: false
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      show: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
