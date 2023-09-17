import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import { Show } from 'src/app/interfaces/show';
import { Principals } from 'src/app/interfaces/principals';
import { GeneralService } from 'src/app/config/general.service';
import { MessageService } from 'src/app/message.service';
import { AuthService } from '../config/auth.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.less']
})
export class ShowsComponent implements OnInit, OnDestroy {

  public shows: Show[] = [];
  private showsSubscription: Subscription = new Subscription;
  public loading$!: Observable<boolean>;
  public userId: string | null = '';

  constructor(
    private generalService: GeneralService,
    private messageService: MessageService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadShows();
    this.userId = localStorage.getItem('user_id');
  }

  loadShows(showName: string = 'friend') {
    this.generalService.title$.subscribe(title => {
      this.loading$ = this.generalService.getLoading();
      if(title) {
        showName = title;
      }
      this.showsSubscription = this.generalService.findByName(showName).pipe(
        map(response => response.results?.filter(
          (show: Show) => show.image && show.titleType == 'tvSeries'
        ))
      ).subscribe(results => {
        this.shows = results
        this.getCredits(this.shows, showName);
      });
    })
  }

  getCredits(shows: Show[], showName?: string) {
    if(shows) {
      shows.forEach((show: Show) => {
        show.credits = [];
        show.principals.forEach((principal: Principals) => {
          show.credits.push(principal.name);
        });
      });
    } else {
      this.messageService.clear();
      this.messageService.add(`No shows were found with name ${showName}`, true);
    }
  }

  ngOnDestroy(): void {
    this.showsSubscription.unsubscribe();
  }
}
