import { Component } from '@angular/core';
import { SurveyForm } from '../models/SurveyForm';
import { SurveyService } from '../services/survey.service';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent {
  surveys: SurveyForm[] = new Array();

  constructor(private surveyService: SurveyService) {
    this.surveyService.getSurveyForms().subscribe(forms => this.loadData(forms));
  }

  loadData(forms) {
    this.surveys = forms;
  }
}
