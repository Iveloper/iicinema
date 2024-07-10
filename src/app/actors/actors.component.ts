import { AuthService } from './../config/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { GeneralService } from 'src/app/config/general.service';
import { Actor } from 'src/app/interfaces/actor';
import { FavoriteService } from '../config/favorite.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.less']
})
export class ActorsComponent implements OnInit, OnDestroy {

  public actors: Actor[] = [];
  private actorsSubscription: Subscription = new Subscription;
  public loading$!: Observable<boolean>;
  public userId: string | null = '';

  constructor(
    private generalService: GeneralService,
    public authService: AuthService,
    public favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    this.loadActors();
    this.userId = localStorage.getItem('user_id');
  }

  loadActors(actorName: string = 'Robert') {
    this.generalService.title$.subscribe(title => {
      this.loading$ = this.generalService.getLoading();
      if(title) {
        actorName = title;
      }
      this.actorsSubscription = this.generalService.findByName(actorName).pipe(
        map(response => response.results.filter(
          (actor: Actor) => actor.image && actor.knownFor
        ))
      ).subscribe(results => {
        this.actors = results;
      });
    });
  }

  ngOnDestroy(): void {
    this.actorsSubscription.unsubscribe();
  }
}
