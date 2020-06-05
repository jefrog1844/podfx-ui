import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, share} from 'rxjs/operators';

import {Matrix} from './matrix';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};

const apiUrl = "http://localhost:9080/podfx/resources/dfmeas";

@Injectable({
    providedIn: 'root'
})
export class FailureModesService {

    constructor(private http: HttpClient) {}

    getMatrix(dfmeaId: number): Observable<Matrix> {
        const url = `${apiUrl}/${dfmeaId}/failure-modes`;
        return this.http.get<Matrix>(url,{withCredentials: true}).pipe(
            tap(_ => this.log(`fetched matrix (dfmeaId)=${dfmeaId}`)),
            catchError(this.handleError<Matrix>(`getMatrix dfmeaId=${dfmeaId}`))
        );
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        //this.messageService.add(`HeroService: ${message}`);
        console.log('APIService: ' + message);
    }
}
