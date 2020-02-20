import { Component } from '@angular/core';
import { SurveyForm } from '../../models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home-doop.component.html',
})

export class AdminHomeDoopComponent {
    surveys: SurveyForm[] = new Array();

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    if (this.authenticationService.isLoggedIn == false) {
      this.router.navigate(['/login']);
    }
  }
}
