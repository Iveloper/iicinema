import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, takeUntil } from 'rxjs';
import { GeneralService } from 'src/app/config/general.service';
import { Show } from 'src/app/interfaces/show';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.less']
})
export class ShowDetailComponent implements OnInit, OnDestroy {

  public show: Show | undefined;
  public showRatings: any;
  public showPlots: any;
  public showId: string = String(this.route.snapshot.paramMap.get('id'));
  public castIds: Array<String> = [];
  public castInfo: any;
  private _destroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private generalService: GeneralService
  ) { }
  
  ngOnInit(): void {
    this.loadShow();
    this.loadTopCastIds();
  }
  
  loadShow() {
    this.generalService.getProjectionDetails(this.showId).subscribe(results => {
      this.show = results.details;
      this.showRatings = results.ratings;
      this.showPlots = results.plots;
      console.log(this.show, this.showPlots);
    });
  }
  
  loadTopCastIds() {
    this.generalService.getProjectionTopCastIds(this.showId).pipe(
      map(response => response.filter(
        (name: string, index: Number) => index < 6
      ).forEach((response: any) => {
        this.castIds.push(response.split('/name/').pop().split('/')[0]);
      }),
      ),
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this.castInfo = this.generalService.getTopCastInformation(this.castIds)
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    // .complete() is the same as .unsubscribe() in this case
    this._destroy$.complete();
  }
}
