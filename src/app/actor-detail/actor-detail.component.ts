import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActorService } from 'src/app/config/actor.service';
import { Awards } from 'src/app/interfaces/awards';
import { Bio } from 'src/app/interfaces/bio';
import { KnownFor } from 'src/app/interfaces/known_for';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.less']
})
export class ActorDetailComponent implements OnInit, OnDestroy {

  public actorId: string = String(this.route.snapshot.paramMap.get('id'));
  public actor!: Bio;
  public awards!: Awards;
  public knownFor!: KnownFor[];
  public loading$!: Observable<boolean>;
  public toggleDescription: boolean = false;
  private _destroy$ = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) { }

  ngOnInit(): void {
    this.loadActor();
  }

  public loadActor() {
    this.actorService.title$.subscribe(() => {
      this.loading$ = this.actorService.getLoading();
      this.actorService.getActorInfo(this.actorId).pipe(
        takeUntil(this._destroy$)
      ).subscribe(results => {
        this.actor = results.bio;
        this.awards = results.awards;
        this.knownFor = results.knownfor;
        console.log(this.actor, this.knownFor, this.awards);
      })    
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
