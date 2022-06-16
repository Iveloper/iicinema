import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActorDetailComponent } from 'src/app/actor-detail/actor-detail.component';
import { ActorsComponent } from 'src/app/actors/actors.component';
import { LandingComponent } from 'src/app/landing/landing.component';
import { MovieDetailComponent } from 'src/app/movie-detail/movie-detail.component';
import { MoviesComponent } from 'src/app/movies/movies.component';
import { ShowDetailComponent } from 'src/app/show-detail/show-detail.component';
import { ShowsComponent } from 'src/app/shows/shows.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    data: {
      show: true,
      title: 'Home',
      icon: 'home'
    }
  },
  { 
    path: 'movies', 
    component: MoviesComponent,
    data: {
      show: true,
      title: 'Movies',
      icon: 'movie'
    } 
  },
  { 
    path: 'movie/title/:id', 
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
      title: 'TV Shows',
      icon: 'tv'
    }
  },
  { 
    path: 'show/title/:id', 
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
      title: 'Actors',
      icon: 'recent_actors'
    } 
  },
  { 
    path: 'actor/name/:id', 
    component: ActorDetailComponent,
    data: {
      show: false
    } 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }