import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, finalize, forkJoin, Observable, of, tap } from 'rxjs';
import { MessageService } from 'src/app/message.service';

const APIurl = 'https://online-movie-database.p.rapidapi.com/';
const httpOptions = {
    method: 'GET',
    headers: new HttpHeaders({
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
        'X-RapidAPI-Key': '2699f5c2bemsh20923a10f7b86e8p1fa75ajsnbf2ce7219f22'
    })
};

@Injectable({ providedIn: 'root' })
export class GeneralService {
    public title$ = new BehaviorSubject<string>('');
    public loading$ = new BehaviorSubject<boolean>(true);

    constructor(
        private http: HttpClient,
        private messageService: MessageService
    ) { }

    private log(message: string) {
        this.messageService.add(`GeneralService: ${message}`);
    }

    getLoading(): Observable<boolean> {
        return this.loading$;
    }

    findByName(name: string): Observable<any> {
        this.loading$.next(true)
        return this.http.get<any>(
          `${APIurl}title/find?q=${name}`,
          httpOptions
        ).pipe(
          tap(_ => this.messageService.clear()),
          tap(_ => this.log('fetched titles')),
          catchError(this.handleError<any>('Searched results', [])),
          finalize(() => this.loading$.next(false))
        );
    }

    getProjectionDetails(projectionId: string): Observable<any> {
        this.loading$.next(true)
        return forkJoin({
            details: this.http.get<any>(`${APIurl}title/get-details?tconst=${projectionId}`, httpOptions),
            ratings: this.http.get<any>(`${APIurl}title/get-ratings?tconst=${projectionId}`, httpOptions),
            plots: this.http.get<any>(`${APIurl}title/get-plots?tconst=${projectionId}`, httpOptions),
            genres: this.http.get<any>(`${APIurl}title/get-genres?tconst=${projectionId}`, httpOptions)
        }).pipe(
            tap(_ => this.messageService.clear()),
            tap(_ => this.log(`fetched details and ratings for ${projectionId}`)),
            catchError(this.handleError<any>('getDetails', [])),
            finalize(() => this.loading$.next(false))
        );
    }

    getProjectionCreditsReviews(projectionId: string): Observable<any> {
        this.loading$.next(true)
        return forkJoin({
            reviews: this.http.get<any>(`${APIurl}title/get-user-reviews?tconst=${projectionId}`, httpOptions),
            credits: this.http.get<any>(`${APIurl}title/get-full-credits?tconst=${projectionId}`, httpOptions)
        }).pipe(
            catchError(this.handleError<any>('getTopCastIds', [])),
            finalize(() => this.loading$.next(false))
        );
    }

    getMoreLikeThisId(projectionId: string): Observable<any> {
        this.loading$.next(true)
        return this.http.get<any>(
            `${APIurl}title/get-more-like-this?tconst=${projectionId}`,
            httpOptions
        ).pipe(
            catchError(this.handleError<any>('getMoreLikeThisId', [])),
            finalize(() => this.loading$.next(false))
        )
    }

    getMoreLikeThisDetails(projectionsId: Array<String>) {
        this.loading$.next(true);
        return forkJoin(
            projectionsId.map(projection =>
                this.http.get<any>(
                    `${APIurl}title/get-details?tconst=${projection}`,
                    httpOptions
                ).pipe(
                    catchError(this.handleError<any>('getMoreLikeThisDetails', [])),
                )
            )
        ).pipe(
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