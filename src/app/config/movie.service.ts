import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
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
