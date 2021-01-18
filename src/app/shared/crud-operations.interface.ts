import {Observable, of} from 'rxjs';

export interface CrudOperations<T, ID> {
	create(t: T): Observable<T>;
	update(id: ID, t: T): Observable<T>;
	findOne(id: ID): Observable<T>;
	findAll(): Observable<T[]>;
	delete(id: ID): Observable<any>;
}