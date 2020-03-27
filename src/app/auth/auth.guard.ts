import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild
} from '@angular/router';

import {AuthenticationService} from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(private authService: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        const currentUser = this.authService.currentUserValue;
        if (currentUser) {
            // logged in so return true
            return true;
        }
        
        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], {queryParams: {returnUrl: state.url}});
        return false;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate(route, state);
    }
}