import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import {AuthenticationService} from '../auth/auth.service';
import {Credentials} from '../auth/credentials';

@Injectable()
export class JwtAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // add authorization header with basic auth credentials if available
        const creds:Credentials = this.authService.currentUserValue;
        
        if (creds) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${creds.token}`
                }
            });

        }

        return next.handle(request);
    }
}