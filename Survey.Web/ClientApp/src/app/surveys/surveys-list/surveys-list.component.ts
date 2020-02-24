import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurveyForm } from '@app/models/SurveyForm';
import { error } from '@angular/compiler/src/util';
import { SurveyService } from '@app/services/survey.service';
import { AuthenticationService } from '@app/services/authentication.service';


@Component({
  selector: 'app-surveys',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.css']
})
/** Surveys component*/
export class SurveysListComponent {
  public http: HttpClient;
  public url: string;
  public surveys: SurveyForm[];
  /** Surveys ctor */
  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private surveyService: SurveyService, private authenticationService: AuthenticationService) {
    this.http = http;
    this.url = baseUrl;
    if (!this.authenticationService.isLoggedIn) {
      this.surveyService.getSurveyForms().subscribe(result => { this.surveys = result; }, error => console.log(error));
    }
    else {
      this.authenticationService.loadUser();
      if (this.authenticationService.user.isAdmin) {
        this.surveyService.getSurveyFormsAsAdmin().subscribe(result => { this.surveys = result; }, error => console.log(error));
      }
      else {
        this.surveyService.getSurveyFormsAsUser().subscribe(result => { this.surveys = result; }, error => console.log(error));
      }
    }
  }


}
