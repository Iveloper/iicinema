import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { map, Observable, Subscription } from 'rxjs';
import { GeneralService } from '../config/general.service';
import { MessageService } from '../message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-genre-titles',
  templateUrl: './genre-titles.component.html',
  styleUrls: ['./genre-titles.component.less']
})
export class GenreTitlesComponent implements OnInit, OnDestroy {

  public genre: string = String(this.route.snapshot.paramMap.get('genre'));
  public limit: number = 4;
  public movieName: string = '';
  public moviesIds: String[] = [];
  public movies: Movie[] = [];
  private moviesByGenreSubscription: Subscription = new Subscription;
  public loading$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.loadMoviesByGenre();
  }

  loadMoviesByGenre() {
    this.generalService.title$.subscribe(title => {
      this.loading$ = this.generalService.getLoading();
      if(title) {
        this.movieName = title;
      }
      this.moviesByGenreSubscription = this.generalService.loadMoviesForGenre(this.genre, this.limit).subscribe(results => {
        this.moviesIds = results;
        this.detailsForMoviesByGenre(this.moviesIds);
      });
    });
  }

  detailsForMoviesByGenre(mltIds: String[]) {
    let regex = /\/title\/(.+?)\//;
    if(mltIds) {
      mltIds.forEach((element, index) => {
        let match = element.match(regex);
        if(match) {
          mltIds[index] = match[1];
        } else {
          mltIds.splice(index, 1);
        }
      });
      this.generalService.getMoreLikeThisDetails(mltIds).subscribe(response => {
        this.movies = response;
      });
    }
  }

  ngOnDestroy(): void {
    this.moviesByGenreSubscription.unsubscribe()
  }
}
