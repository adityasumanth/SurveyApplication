import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { SurveyForm, SurveyData } from '../../models';

@Component({
    selector: 'app-admin-survey-details',
    templateUrl: './admin-survey-details.component.html',
    styleUrls: ['./admin-survey-details.component.css']
})
/** admin-survey-details component*/
export class AdminSurveyDetailsComponent implements OnInit {
    survey: SurveyForm;
    id: number;
    /** admin-survey-details ctor */
    constructor(private route: ActivatedRoute, private surveyService: SurveyService) {
        this.survey = new SurveyForm();
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.id = Number(params.get('id'));
            this.surveyService.getSurveyFormById(this.id).subscribe(result => {
                this.survey = result;
            }, error => console.log(error));
        });
    }
}
