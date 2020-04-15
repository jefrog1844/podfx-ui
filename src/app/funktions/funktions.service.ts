import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';


const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};

const apiUrl = "http://localhost:9080/podfx/resources/dfmeas";

@Injectable({
  providedIn: 'root'
})
export class FunktionsService {

  constructor(private http: HttpClient) {}
  
      generateFunktions(dfmeaId: number): Observable<number> {
        const url = `${apiUrl}/${dfmeaId}/funktions/generateFunktions`;
        return this.http.get(url, httpOptions).pipe(
            tap(() => this.log(`generated functions for dfmea id=${dfmeaId}`)),
            catchError(this.handleError<any>('generateFunktions'))
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
