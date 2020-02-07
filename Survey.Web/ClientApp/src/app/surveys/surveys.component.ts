import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
    selector: 'app-surveys',
    templateUrl: './surveys.component.html',
    styleUrls: ['./surveys.component.css']
})
/** Surveys component*/
export class SurveysComponent {
    /** Surveys ctor */
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {

    }
}
