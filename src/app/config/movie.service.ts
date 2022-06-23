import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from 'src/app/message.service';

const APIurl = 'https://online-movie-database.p.rapidapi.com/';
const httpOptions = {
  method: 'GET',
  headers: new HttpHeaders({ 
  'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com' ,
  'X-RapidAPI-Key': '2699f5c2bemsh20923a10f7b86e8p1fa75ajsnbf2ce7219f22'
  })
};

@Injectable({ providedIn: 'root' })
export class MovieService {
  
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }

  private handleError<T>(operation = 'failed operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
}