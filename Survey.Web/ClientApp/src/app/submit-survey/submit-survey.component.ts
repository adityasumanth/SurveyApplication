import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyForm } from '../models/SurveyForm';
import { NgForm } from '@angular/forms';
import { SurveyData } from '../models/SurveyData';
import { SurveyAnswer } from '../models/SurveyAnswer';
import { SurveyService } from '../services/survey.service';

@Component({
    selector: 'app-new-survey',
    templateUrl: './submit-survey.component.html',
    styleUrls: ['./submit-survey.component.css']
})
/** new-survey component*/
export class SubmitSurveyComponent implements OnInit {
    public id: number;
    public survey: SurveyForm;
    public pollData: SurveyData;
    public answers: SurveyAnswer[];
    public email: string;
    /** new-survey ctor */
    constructor(private route: ActivatedRoute, private surveyService: SurveyService) {
        this.survey = new SurveyForm();
        this.pollData = new SurveyData();
        this.answers = new Array<SurveyAnswer>();
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.id = Number(params.get('id'));
            this.surveyService.getSurveyFormById(this.id).subscribe(result => { this.survey = result; }, error => console.log(error));
        });
    }

    SubmitForm(form: NgForm) {

        for (let q of this.survey.questions) {
            let answer: SurveyAnswer = new SurveyAnswer();
            answer.surveyQuestionId = q.id;
            answer.surveyOptionId = parseInt(form.value["option-" + q.id]);
            this.answers.push(answer);
        }
        this.pollData = new SurveyData();
        this.pollData.email = form.value.email;
        this.pollData.surveyFormID = this.id;
        this.pollData.answers = this.answers;
        this.surveyService.postPollData(this.pollData).subscribe(result => {
            window.location.href = "/surveys";
        }, error => {
            console.error(error); this.pollData = new SurveyData(); this.answers = new Array<SurveyAnswer>()
        });
    }
}

