import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap, share} from 'rxjs/operators';
import {Block} from './block';
import {BlockId} from './blockId';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
};

const apiUrl = "http://localhost:9080/podfx/resources/dfmeas";

@Injectable({
    providedIn: 'root'
})

export class BlocksService {

    constructor(private http: HttpClient) {}

    getBlockDiagram(dfmeaId: string): Observable<Block[]> {
        const url = `${apiUrl}/${dfmeaId}/blocks/diagram`;
        return this.http.get<Block[]>(url,{withCredentials: true}).pipe(
            share(),
            tap(_ => this.log(`fetched Block diagram (dfmeaId)=${dfmeaId}`)),
            catchError(this.handleError<Block[]>(`getBlockDiagram dfmeaId=${dfmeaId}`))
        );
    }

    getBlock(dfmeaId: string, blockId: string): Observable<Block> {
        const url = `${apiUrl}/${dfmeaId}/blocks/${blockId}`;
        return this.http.get<Block>(url,{withCredentials: true}).pipe(
            tap(_ => this.log(`fetched block id=${blockId}`)),
            catchError(this.handleError<Block>(`getFactor id=${blockId}`))
        );
    }

    addBlock(dfmeaId: string, block: Block): Observable<Block> {
        const url = `${apiUrl}/${dfmeaId}/blocks`;
        return this.http.post<Block>(url, block, httpOptions).pipe(
            tap((b: Block) => this.log(`added block w/ id=${b.id}`)),
            catchError(this.handleError<Block>('addBlock'))
        );
    }

    deleteBlock(dfmeaId: string, blockId: string): Observable<Block> {
        const url = `${apiUrl}/${dfmeaId}/blocks/${blockId}`;
        return this.http.delete<Block>(url, httpOptions).pipe(
            tap(_ => this.log(`deleteBlock(id)= ${blockId}`)),
            catchError(this.handleError<Block>('deleteBlock'))
        );
    }

    updateBlock(dfmeaId: string, block: Block): Observable<any> {
        const url = `${apiUrl}/${dfmeaId}/blocks/${block.id}`;
        return this.http.put(url, block, httpOptions).pipe(
            tap(_ => this.log(`updated block id=${block.id}`)),
            catchError(this.handleError<Block>('updateBlock'))
        );
    }

    getBlockIds(dfmeaId: string): Observable<BlockId[]> {
        const blocksUrl = `${apiUrl}/${dfmeaId}/blocks`;
        return this.http.get<BlockId[]>(blocksUrl,{withCredentials: true})
            .pipe(
                share(),
                tap(_ => this.log('fetched block list')),
                catchError(this.handleError<BlockId[]>('getBlockIds', []))
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


    private log(message: string) {
        console.log('APIService: ' + message);
    }
}
