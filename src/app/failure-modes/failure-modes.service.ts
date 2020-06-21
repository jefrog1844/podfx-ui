import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, share} from 'rxjs/operators';

import {Funktion} from '../funktions/funktion';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};

const apiUrl = "http://localhost:9080/podfx/resources";

@Injectable({
    providedIn: 'root'
})
export class FailureModesService {

    constructor(private http: HttpClient) {}
    
    updateFailureModes(funktion: Funktion, form: FormData): Observable<any> {
        const url = `${apiUrl}/funktions/${funktion.id}/failure-modes`;
        return this.http.put(url, form, httpOptions).pipe(
            tap(_ => this.log(`updated failure modes for funktion id=${funktion.id}`)),
            catchError(this.handleError<Funktion>('updateFailureModes'))
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
