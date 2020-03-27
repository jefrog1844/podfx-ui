import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, share} from 'rxjs/operators';
import {Factor} from './factor';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};

const apiUrl = "http://localhost:9080/podfx/resources/dfmeas";

@Injectable({
    providedIn: 'root'
})
export class FactorsService {

    constructor(private http: HttpClient) {}

    getFactors(dfmeaId: string): Observable<Factor[]> {
        const url = `${apiUrl}/${dfmeaId}/factors`;
        return this.http.get<Factor[]>(url,{withCredentials: true}).pipe(
            share(),
            tap(_ => this.log(`fetched factors (dfmeaId)=${dfmeaId}`)),
            catchError(this.handleError<Factor[]>(`getFactors dfmeaId=${dfmeaId}`))
        );
    }

    getFactor(dfmeaId: string, factorId: string): Observable<Factor> {
        const url = `${apiUrl}/${dfmeaId}/factors/${factorId}`;
        return this.http.get<Factor>(url,{withCredentials: true}).pipe(
            tap(_ => this.log(`fetched factor id=${factorId}`)),
            catchError(this.handleError<Factor>(`getFactor id=${factorId}`))
        );
    }

    addFactor(dfmeaId: string, factor: Factor): Observable<Factor> {
        const url = `${apiUrl}/${dfmeaId}/factors`;
        return this.http.post<Factor>(url, factor, httpOptions).pipe(
            tap((f: Factor) => this.log(`added factor w/ id=${f.id}`)),
            catchError(this.handleError<Factor>('addFactor'))
        );
    }

    updateFactor(dfmeaId: string, factor: Factor): Observable<Factor> {
        const url = `${apiUrl}/${dfmeaId}/factors/${factor.id}`;
        return this.http.put(url, factor, httpOptions).pipe(
            tap((f: Factor) => this.log(`updated factor id=${f.id}`)),
            catchError(this.handleError<any>('updateFactor'))
        );
    }

    deleteFactor(dfmeaId: string, factorId: string): Observable<Factor> {
        const url = `${apiUrl}/${dfmeaId}/factors/${factorId}`;
        return this.http.delete<Factor>(url, httpOptions).pipe(
            tap(_ => this.log(`deleteFactor(id)= ${factorId}`)),
            catchError(this.handleError<Factor>('deleteFactor'))
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
