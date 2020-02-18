import { Component } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Router } from '@angular/router';
import { User } from '../models';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    currentUser: User;
    public authenticationService: AuthenticationService;
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) {
        this.authenticationService = authService;
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    isExpanded = false;

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
