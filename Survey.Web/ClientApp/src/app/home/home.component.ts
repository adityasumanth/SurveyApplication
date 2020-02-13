import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SurveyForm } from '@app/models/SurveyForm';
import { SurveyService } from '../services/survey.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
  surveyForms: SurveyForm[] = new Array();
  classList: string[] = ['shake'];
    constructor(private surveyService: SurveyService) {
        this.surveyService.getSurveyForms().subscribe(forms => this.loadData(forms));
    }
    loadData(forms) {
        this.surveyForms = forms;
    }
    getBtnClass() {
        return this.classList;
    }
}
