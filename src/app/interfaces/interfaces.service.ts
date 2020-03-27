import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map, share} from 'rxjs/operators';

import {Matrix} from './matrix';
import {InterfaceDetail} from './interface-detail';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};

const apiUrl = "http://localhost:9080/podfx/resources/dfmeas";

@Injectable({
    providedIn: 'root'
})
export class InterfacesService {

    constructor(private http: HttpClient) {}

    getMatrix(dfmeaId: string): Observable<Matrix[]> {
        const url = `${apiUrl}/${dfmeaId}/interfaces/matrix`;
        return this.http.get<Matrix[]>(url,{withCredentials: true}).pipe(
            share(),
            tap(_ => this.log(`fetched matrix (dfmeaId)=${dfmeaId}`)),
            catchError(this.handleError<Matrix[]>(`getMatrix dfmeaId=${dfmeaId}`))
        );
    }

    getInterfaceDetail(dfmeaId: string, interfaceId: string): Observable<InterfaceDetail> {
        const url = `${apiUrl}/${dfmeaId}/interfaces/${interfaceId}`;
        return this.http.get<InterfaceDetail>(url,{withCredentials: true}).pipe(
            tap(_ => this.log(`fetched interface detail id=${interfaceId}`)),
            catchError(this.handleError<InterfaceDetail>(`getInterfaceDetail id=${interfaceId}`))
        );
    }

    updateInterface(dfmeaId: string, i: InterfaceDetail): Observable<InterfaceDetail> {
        const url = `${apiUrl}/${dfmeaId}/interfaces/${i.id}`;
        return this.http.put(url, i, httpOptions).pipe(
            tap((i: InterfaceDetail) => this.log(`updated interface id=${i.id}`)),
            catchError(this.handleError<any>('toggleInterface'))
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
