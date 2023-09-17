import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable, Subject, takeUntil } from 'rxjs';
import { GeneralService } from 'src/app/config/general.service';
import { Movie } from 'src/app/interfaces/movie';
import { Plot } from 'src/app/interfaces/plot';
import { Principals } from 'src/app/interfaces/principals';
import { Rating } from 'src/app/interfaces/rating';
import { Review } from 'src/app/interfaces/review';
import { AuthService } from '../config/auth.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.less']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  public movieId: string = String(this.route.snapshot.paramMap.get('id'));
  public movie!: Movie;
  public movieCredits!: Principals[];
  public movieRatings!: Rating;
  public moviePlots!: Plot;
  public movieGenres: Array<String> = [];
  public userReviews!: Review[];
  public reviewSource!: Review[];
  public moreLikeThisId: String[] = [];
  public moreLikeThisDetail!: Movie[];
  public loading$!: Observable<boolean>;
  public loadingMoreLikeThis$!: Observable<boolean>;
  public toggleDescription: boolean = false;
  private _destroy$ = new Subject<boolean>();
  public userId: string | null = '';

  //Paginator config
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public currentPage: number = 0;
  public pageSize: number = 2;

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.movie);
    this.loadMovie();
    this.userId = localStorage.getItem('user_id');
  }

  public loadMovie() {
    this.generalService.title$.subscribe(() => {
      this.loading$ = this.generalService.getLoading();
      this.generalService.getProjectionDetails(this.movieId).pipe(
        takeUntil(this._destroy$),
        finalize(() => this.loadCreditsReviews())
        ).subscribe(results => {
          this.movie = results.details;
          this.movieRatings = results.ratings;
          this.moviePlots = results.plots;
          this.movieGenres = results.genres;
        });
    });
  }

  public loadCreditsReviews() {
    this.generalService.title$.subscribe(() => {
      this.loading$ = this.generalService.getLoading();
      this.generalService.getProjectionCreditsReviews(this.movieId).pipe(
        takeUntil(this._destroy$)
        ).subscribe(results => {
          this.movieCredits = results.credits.cast;
          this.userReviews = results.reviews.reviews;
          this.renderPerPage();
        });
    });
  }

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.renderPerPage();
  }

  public renderPerPage() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.userReviews.slice(start, end);
    this.reviewSource = part;
  }

  public lazyLoadScroll() {
    //Call once and destroy
    this.lazyLoadScroll = function(){};
    this.generalService.title$.subscribe(() => {
      this.loadingMoreLikeThis$ = this.generalService.getLoading();
      this.generalService.getMoreLikeThisId(this.movieId).pipe(
        map(response => response.filter(
          (name: string, index: Number) => index < 6
        ).forEach((response: any) => {
          this.moreLikeThisId.push(response.split('/title/').pop().split('/')[0]);
        }),
        ),
        takeUntil(this._destroy$)
      ).subscribe(() => {
        this.moreLikeThisDetails(this.moreLikeThisId)
      });
    });
  }

  public moreLikeThisDetails(mltIds: String[]) {
    this.generalService.getMoreLikeThisDetails(mltIds).subscribe(response =>
       this.moreLikeThisDetail = response
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
