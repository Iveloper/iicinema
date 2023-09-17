import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, forkJoin, Observable, of, tap } from 'rxjs';
import { MessageService } from 'src/app/message.service';

const APIurl = 'https://online-movie-database.p.rapidapi.com/';
const httpOptions = {
  method: 'GET',
  headers: new HttpHeaders({
  'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com' ,
  'X-RapidAPI-Key': 'ebfb745e21msh7e45800dff329aep139f9cjsnac794a999cbf'
  })
};

@Injectable({ providedIn: 'root' })
export class ActorService {
  public title$ = new BehaviorSubject<string>('');
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`ActorService: ${message}`);
  }

  getLoading(): Observable<boolean> {
    return this.loading$;
  }

  getActorInfo(id: string): Observable<any> {
    this.loading$.next(true);
    return forkJoin({
      bio: this.http.get<any>(`${APIurl}actors/get-bio?nconst=${id}`, httpOptions),
      awards: this.http.get<any>(`${APIurl}actors/get-awards-summary?nconst=${id}`, httpOptions),
      knownfor: this.http.get<any>(`${APIurl}actors/get-known-for?nconst=${id}`, httpOptions)
    }).pipe(
        catchError(this.handleError<any>('Building Actor Details page', [])),
        finalize(() => this.loading$.next(false))
    );
  }

  getFavoriteActorsById(id: string): Observable<any>{
    this.loading$.next(true);
    return forkJoin({
      bio: this.http.get<any>(`${APIurl}actors/get-bio?nconst=${id}`, httpOptions),
    }).pipe(
        catchError(this.handleError<any>('Building Actor Details page', [])),
        finalize(() => this.loading$.next(false))
    );
  }

  private handleError<T>(operation = 'failed operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
