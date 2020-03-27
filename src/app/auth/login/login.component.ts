import {Component} from '@angular/core';
import {Router, NavigationExtras} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthenticationService} from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;

    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(public authService: AuthenticationService, public router: Router) {
        this.setMessage();

    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn() ? 'in' : 'out');
    }

    login() {
        this.message = 'Trying to log in ...';

        this.authService.login(this.loginForm.value).subscribe(
            res => this.setMessage(),
            err => this.message = "Verify username and password.",
            () => {
                this.setMessage();

                if (this.authService.isLoggedIn()) {
                    // Get the redirect URL from our auth service
                    // If no redirect has been set, use the default
                    let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/dfmeas';

                    // Set our navigation extras object
                    // that passes on our global query params and fragment
                    let navigationExtras: NavigationExtras = {
                        queryParamsHandling: 'preserve',
                        preserveFragment: true
                    };

                    // Redirect the user
                    this.router.navigateByUrl(redirect, navigationExtras);
                }
            });
    }

    logout() {
        this.authService.logout();
        this.setMessage();
    }
}