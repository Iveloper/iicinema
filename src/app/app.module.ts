import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { ShowsComponent } from './shows/shows.component';
import { NewsComponent } from './news/news.component';
import { ActorsComponent } from './actors/actors.component';
import { MessagesComponent } from './messages/messages.component';
import { SymbolSeparatingPipe } from './pipes/symbol-separating.pipe';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MinutesToHoursPipe } from 'src/app/pipes/minutes-to-hours.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { ShowDetailComponent } from './show-detail/show-detail.component';
import { EssentialIdPartPipe } from 'src/app/pipes/essential-id-part.pipe';
import { ActorDetailComponent } from './actor-detail/actor-detail.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FiltersComponent } from './filters/filters.component';
import { LandingComponent } from './landing/landing.component';
import { SpaceBigIntegersPipe } from './pipes/space-big-integers.pipe'
@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    ShowsComponent,
    NewsComponent,
    ActorsComponent,
    MessagesComponent,
    SymbolSeparatingPipe,
    MinutesToHoursPipe,
    EssentialIdPartPipe,
    MovieDetailComponent,
    MainMenuComponent,
    ShowDetailComponent,
    ActorDetailComponent,
    SearchBarComponent,
    FiltersComponent,
    LandingComponent,
    SpaceBigIntegersPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
