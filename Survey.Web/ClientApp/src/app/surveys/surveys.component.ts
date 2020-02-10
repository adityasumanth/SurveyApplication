import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurveyForm } from '../models/SurveyForm';
import { error } from '@angular/compiler/src/util';
import { SurveyService } from '../services/survey.service';


@Component({
    selector: 'app-surveys',
    templateUrl: './surveys.component.html',
    styleUrls: ['./surveys.component.css']
})
/** Surveys component*/
export class SurveysComponent {
    public http: HttpClient;
    public url: string;
    public surveys: SurveyForm[];
    /** Surveys ctor */
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private surveyService: SurveyService) {
        this.http = http;
        this.url = baseUrl;
        this.surveyService.getSurveyForms().subscribe(result => { this.surveys = result; }, error => console.log(error));
    }
}
