import { Component } from '@angular/core';
import { SurveyService } from '../services/survey.service';
import { Router } from '@angular/router';
import { User } from '../models';

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  currentUser: User;

  constructor(
    private router: Router,
    public surveyService: SurveyService
  ) {
    this.surveyService.currentUser.subscribe(x => this.currentUser = x);
    console.log(this.surveyService.isLoggedIn);
    console.log(this.surveyService.currentUserValue());
  }
  
    isExpanded = false;

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.surveyService.logout();
    this.router.navigate(['/login']);
  }
}
