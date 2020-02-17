import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { User } from '../models';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    currentUser: User;
    isLoggedIn: boolean = false;
    constructor(
      private router: Router,
      private authenticationService: AuthenticationService
    ) {
      if (this.authenticationService.isLoggedIn) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
        this.isLoggedIn = true;
      }
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
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
    }
}
