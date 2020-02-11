import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SurveyForm } from '@app/models/SurveyForm';
import { SurveyService } from '../services/survey.service';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    surveyForms: SurveyForm[] = new Array();
    constructor(private surveyService: SurveyService) {
        this.surveyService.getSurveyForms().subscribe(forms => this.loadData(forms));
    }
    loadData(forms) {
        this.surveyForms = forms;
    }
    getBtnClass() {
        var classList = '';
        var rand = Math.floor(Math.random() * 5) + 1;
        classList = 'btn-' + rand;
        return classList;
    }
}
