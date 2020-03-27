import {Component, OnDestroy, OnInit, HostListener} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from './auth/auth.service';
import {Subscription} from 'rxjs'
import {Credentials} from './auth/credentials';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

    currentUser: Credentials;
    private unsubscribe: Subscription;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) {
        this.unsubscribe = this.authService.currentUser.subscribe(u => this.currentUser = u);
    }

    ngOnInit() {

    }

    logout() {
        this.authService.logout();
        this.router.navigate(['login']);
    }

    @HostListener("window:beforeunload")
    async ngOnDestroy() {
        this.unsubscribe.unsubscribe();
    }
}
