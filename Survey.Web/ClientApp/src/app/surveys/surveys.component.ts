import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SurveyForm } from '../models/SurveyForm';
import { error } from '@angular/compiler/src/util';


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
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.url = baseUrl;
        http.get<SurveyForm[]>(baseUrl + 'api/home/surveys').subscribe(result => {
            this.surveys = result;
        }, error => console.error(error));
    }
}
