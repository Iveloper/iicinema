import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ActorService } from 'src/app/config/actor.service';
import { Actor } from 'src/app/interfaces/actor';

@Component({
  selector: 'app-actor-detail',
  templateUrl: './actor-detail.component.html',
  styleUrls: ['./actor-detail.component.less']
})
export class ActorDetailComponent implements OnInit, OnDestroy {

  public actor!: Actor;
  public actorId: string = String(this.route.snapshot.paramMap.get('id'));
  private actorSubscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private actorService: ActorService
  ) { }

  ngOnInit(): void {
    this.loadActor();
  }

  loadActor() {
    this.actorSubscription = this.actorService.getActorBio(this.actorId)
    .subscribe(results => {
      this.actor = results;
      console.log(this.actor);
    })    
  }

  ngOnDestroy(): void {
    this.actorSubscription.unsubscribe();
  }
}
