import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, Observable, Subject, takeUntil } from 'rxjs';
import { GeneralService } from 'src/app/config/general.service';
import { Plot } from 'src/app/interfaces/plot';
import { Principals } from 'src/app/interfaces/principals';
import { Rating } from 'src/app/interfaces/rating';
import { Review } from 'src/app/interfaces/review';
import { Show } from 'src/app/interfaces/show';
import { AuthService } from '../config/auth.service';
import { FavoriteService } from '../config/favorite.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditReviewNewsDialogComponent } from '../edit-review-news-dialog/edit-review-news-dialog.component';
import { ConfirmDeleteDialogComponent } from '../confirm-delete-dialog/confirm-delete-dialog.component';
import { RegistrationResultDialogComponent } from '../registration-result-dialog/registration-result-dialog.component';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.less']
})
export class ShowDetailComponent implements OnInit, OnDestroy {

  public showId: string = String(this.route.snapshot.paramMap.get('id'));
  public show!: Show;
  public showCredits!: Principals[];
  public showRatings!: Rating;
  public showPlots!: Plot;
  public showGenres: Array<String> = [];
  public userReviews!: Review[];
  public reviewSource!: Review[];
  public moreLikeThisId: String[] = [];
  public moreLikeThisDetail!: Show[];
  public castIds: Array<String> = [];
  public castInfo: any;
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
    public authService: AuthService,
    public favoriteService: FavoriteService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadShow();
    this.userId = localStorage.getItem('user_id');
  }

  public loadShow() {
    this.generalService.title$.subscribe(() => {
      this.loading$ = this.generalService.getLoading();
      this.generalService.getProjectionDetails(this.showId).pipe(
        takeUntil(this._destroy$),
        finalize(() => this.loadCreditsReviews())
        ).subscribe(results => {
          this.show = results.details;
          this.showRatings = results.ratings;
          this.showPlots = results.plots;
          this.showGenres = results.genres;
        });
    });
  }

  public loadCreditsReviews() {
    this.generalService.title$.subscribe(() => {
      this.loading$ = this.generalService.getLoading();
      this.generalService.getProjectionCreditsReviews(this.showId).pipe(
        takeUntil(this._destroy$)
        ).subscribe(results => {
          this.showCredits = results.credits.cast;
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
      this.generalService.getMoreLikeThisId(this.showId).pipe(
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
    // .complete() is the same as .unsubscribe() in this case
    this._destroy$.complete();
  }
}
