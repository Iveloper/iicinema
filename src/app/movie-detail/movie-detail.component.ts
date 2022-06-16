import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { GeneralService } from 'src/app/config/general.service';
import { Movie } from 'src/app/interfaces/movie';
import { Plot } from 'src/app/interfaces/plot';
import { Rating } from 'src/app/interfaces/rating';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.less']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  public movie!: Movie;
  public movieRatings!: Rating;
  public moviePlots!: Plot;
  public movieGenres: Array<String> = [];
  public movieId: string = String(this.route.snapshot.paramMap.get('id'));
  public castIds: Array<String> = [];
  public castInfo!: Observable<any[]>;
  public loading$!: Observable<boolean>;
  public toggleDescription: boolean = false;
  private _destroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.loadMovie();
    //this.loadTopCastIds();
  }

  loadMovie() {
    this.generalService.title$.subscribe(() => {
      this.loading$ = this.generalService.getLoading();
      this.generalService.getProjectionDetails(this.movieId).pipe(
        takeUntil(this._destroy$)
        ).subscribe(results => {
          this.movie = results.details;
          this.movieRatings = results.ratings;
          this.moviePlots = results.plots;
          this.movieGenres = results.genres;
          console.log(this.movie, this.movieRatings, this.moviePlots);
        });
    });
  }

  loadTopCastIds() {
    this.generalService.getProjectionTopCastIds(this.movieId).pipe(
      map(response => response.filter(
        (name: string, index: Number) => index < 5
      ).forEach((response: any) => {
        this.castIds.push(response.split('/name/').pop().split('/')[0]);
      }),
      ),
      /*!takeUntil should always be last in the pipe chain,
      so that all generated observables are handled! */
      takeUntil(this._destroy$)
    ).subscribe(() => {
      /* Since castInfo is async we will have to use the info in template AS IS.
      Cannot be manipulated here! */
      this.castInfo = this.generalService.getTopCastInformation(this.castIds);
    });
  }

  toggleInfo(element: string): void {
    
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
