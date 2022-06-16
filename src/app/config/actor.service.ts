import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from 'src/app/message.service';

const APIurl = 'https://online-movie-database.p.rapidapi.com/';
const httpOptions = {
  method: 'GET',
  headers: new HttpHeaders({ 
  'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com' ,
  'X-RapidAPI-Key': 'b2650efbb1msh00dd827cee6bdaep1dcbfdjsn7e6cf628cffc'
  })
};

@Injectable({ providedIn: 'root' })
export class ActorService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`ActorService: ${message}`);
  }

  getActorBio(id: string): Observable<any> {
    return this.http.get<any>(
      `${APIurl}actors/get-bio?nconst=${id}`,
      httpOptions
    ).pipe(
      tap(_ => this.messageService.clear()),
      tap(_ => this.log(`fetched actor ${id}`)),
      catchError(this.handleError<any>(`getActor ${id}`, []))
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