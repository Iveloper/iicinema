import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { MessageService } from 'src/app/message.service';


const httpOptions = {
  method: 'GET',
  headers: new HttpHeaders({ 
  'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com' ,
  'X-RapidAPI-Key': 'b2650efbb1msh00dd827cee6bdaep1dcbfdjsn7e6cf628cffc'
  })
};

@Injectable({ providedIn: 'root' })
export class ShowService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`ShowService: ${message}`);
  }

  private handleError<T>(operation = 'failed operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
}