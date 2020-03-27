import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, share} from 'rxjs/operators';
import {Dfmea} from './dfmea';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};
const apiUrl = "http://localhost:9080/podfx/resources/dfmeas";

@Injectable({
    providedIn: 'root'
})
export class DfmeasService {

    constructor(private http: HttpClient) {}

    getDfmeaList(): Observable<Dfmea[]> {
        return this.http.get<Dfmea[]>(apiUrl,{withCredentials: true})
            .pipe(
                share(),
                tap(_ => this.log('fetched dfmea list')),
                catchError(this.handleError<Dfmea[]>('getDfmeaList', []))
            );
    }

    getDfmea(id: string): Observable<Dfmea> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<Dfmea>(url,{withCredentials: true}).pipe(
            tap(_ => this.log(`fetched dfmea id=${id}`)),
            catchError(this.handleError<Dfmea>(`getDfmea id=${id}`))
        );
    }

    addDfmea(dfmea: Dfmea): Observable<Dfmea> {
        return this.http.post<Dfmea>(apiUrl, dfmea, httpOptions).pipe(
            tap((d: Dfmea) => this.log(`added dfmea w/ id=${d.id}`)),
            catchError(this.handleError<Dfmea>('addDfmea'))
        );
    }

    updateDfmea(dfmea: Dfmea): Observable<any> {
        const url = `${apiUrl}/${dfmea.id}`;
        return this.http.put(url, dfmea, httpOptions).pipe(
            tap(_ => this.log(`updated dfmea id=${dfmea.id}`)),
            catchError(this.handleError<any>('updateDfmea'))
        );
    }

    deleteDfmea(id: string): Observable<Dfmea> {
        const url = `${apiUrl}/${id}`;
        return this.http.delete<Dfmea>(url, httpOptions).pipe(
            tap(_ => this.log(`deleteDfmea(id)= ${id}`)),
            catchError(this.handleError<Dfmea>('deleteDfmea'))
        );
    }

    searchDfmeas(term: string): Observable<Dfmea[]> {
        this.log("api service(term)= " + term);
        if (!term.trim()) {
            // if not search term, return empty hero array.
            return of([]);
        }
        return this.http.get<Dfmea[]>(`${apiUrl}/search?title=${term}`,{withCredentials: true}).pipe(
            tap(_ => this.log(`found dfmeas matching "${term}"`)),
            catchError(this.handleError<Dfmea[]>('searchHeroes', []))
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
