import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie';
import { Principals } from 'src/app/interfaces/principals';
import { GeneralService } from 'src/app/config/general.service';
import { MessageService } from 'src/app/message.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.less']
})
export class MoviesComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  private moviesSubscription: Subscription = new Subscription;
  public loading$!: Observable<boolean>;

  constructor(
    private generalService: GeneralService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(movieName: string = 'game') {
    this.generalService.title$.subscribe(title => {
      this.loading$ = this.generalService.getLoading();
      if(title) {
        movieName = title;
      }
      this.moviesSubscription = this.generalService.findByName(movieName).pipe(
        map(response => response.results?.filter(
          (movie: Movie) => movie.image && movie.titleType == 'movie'
        ))
      ).subscribe(results => {
        this.movies = results;
        this.getCredits(this.movies, movieName);
      });
    });
  }

  getCredits(movies: Movie[], movieName?: string) {
    if(movies) {
      movies.forEach((movie: Movie) => {
        movie.credits = [];
        movie.principals.forEach((principal: Principals) => {
          movie.credits.push(principal.name);
        });
      });
    } else {
      this.messageService.clear();
      this.messageService.add(`No movies were found with name ${movieName}!`);
    }
  }

  ngOnDestroy(): void {
    this.moviesSubscription.unsubscribe()
  }
}
