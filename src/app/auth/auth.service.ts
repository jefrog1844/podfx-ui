import {Injectable} from '@angular/core';
import {Router} from '@angular/router/';

import {Observable, of, BehaviorSubject} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';


import {Credentials} from './credentials';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "http://localhost:9080/podfx/resources/users/signIn";


@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<Credentials>;
    public currentUser: Observable<Credentials>;
    redirectUrl: string; //remove this later

    constructor(private http: HttpClient, private router: Router) {
        this.currentUserSubject = new BehaviorSubject<Credentials>(JSON.parse(sessionStorage.getItem('creds')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): Credentials {
        return this.currentUserSubject.value;
    }

    isLoggedIn() {
        if(this.currentUserSubject.value) {
            return true;
        } else {
            return false;
        }
    }
    
    login(cred: Credentials): Observable<Credentials> {
        return this.http.post<Credentials>(apiUrl, cred, httpOptions)
            .pipe(map((creds: Credentials) => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                //user.authdata = window.btoa(user.username + ':' + user.password);
                sessionStorage.setItem('creds', JSON.stringify(creds));
                this.currentUserSubject.next(creds);
                return creds;
            }));
    }

    logout(): void {
        sessionStorage.removeItem('creds');
        this.currentUserSubject.next(null);
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
