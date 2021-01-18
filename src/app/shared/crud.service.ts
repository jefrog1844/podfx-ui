import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, tap, share } from 'rxjs/operators';
import { CrudOperations } from './crud-operations.interface';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

    constructor(
        protected _http: HttpClient,
        protected _base: string
    ) { }

    create(t: T): Observable<T> {
        return this._http.post<T>(this._base, t, httpOptions).pipe(
            tap(_ => this.log(`create | ${this._base} | object=${t}`)),
            catchError(this.handleError<T>(`create | ${this._base} | object=${t}`))
        );
    }

    update(id: ID, t: T): Observable<T> {
        return this._http.put<T>(this._base + "/" + id, t, {}).pipe(
            tap(_ => this.log(`update | ${this._base} | object=${t}`)),
            catchError(this.handleError<T>(`update | ${this._base} | object=${t}`))
        );
    }

    findOne(id: ID): Observable<T> {
        return this._http.get<T>(this._base + "/" + id).pipe(
            tap(_ => this.log(`findOne | ${this._base} | id=${id}`)),
            catchError(this.handleError<T>(`findOne | ${this._base} | id=${id}`))
        );
    }

    findAll(): Observable<T[]> {
        return this._http.get<T[]>(this._base).pipe(
            share(),
            tap(_ => this.log(`findAll | ${this._base}`)),
            catchError(this.handleError<T[]>(`findAll | ${this._base}`))
        );
    }

    search(term: String, query: String): Observable<T[]> {
        const opts = { params: new HttpParams({fromString: `${term}=${query}`}) };
        return this._http.get<T[]>(this._base + '/search', opts).pipe(
            tap(_ => this.log(`search | ${this._base} | ${term} | ${query}`)),
            catchError(this.handleError<T[]>(`search | ${this._base} | ${term} | ${query}`))
        );
    }

    delete(id: ID): Observable<T> {
        return this._http.delete<T>(this._base + '/' + id).pipe(
            tap(_ => this.log(`delete | ${this._base} | id=${id}`)),
            catchError(this.handleError<T>(`delete | ${this._base} | id=${id}`))
        );
    }

    handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    log(message: string) {
        console.log('APIService: ' + message);
    }
}
