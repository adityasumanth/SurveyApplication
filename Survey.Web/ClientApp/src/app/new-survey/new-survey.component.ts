import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SurveyForm } from '../models/SurveyForm';
import { NgForm } from '@angular/forms';
import { SurveyData } from '../models/SurveyData';
import { SurveyAnswer } from '../models/SurveyAnswer';
import { parse } from 'url';

@Component({
    selector: 'app-new-survey',
    templateUrl: './new-survey.component.html',
    styleUrls: ['./new-survey.component.css']
})
/** new-survey component*/
export class NewSurveyComponent implements OnInit {
    public id: number;
    public http: HttpClient;
    public url: string;
    public survey: SurveyForm;
    public pollData: SurveyData;
    public answers: SurveyAnswer[];
    public email: string;
    /** new-survey ctor */
    constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.http = http;
        this.url = baseUrl;
        this.survey = new SurveyForm();
        this.pollData = new SurveyData();
        this.answers = new Array<SurveyAnswer>();
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            console.log(params.get('id'))
            this.id = Number(params.get('id'));
            this.http.get<SurveyForm>(this.url + 'api/Home/survey/' + this.id).subscribe(result => {
                this.survey = result;
            }, error => console.error(error));
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
        this.pollData.Answers = this.answers;
        this.http.post<SurveyData>(this.url + 'api/Home/poll', this.pollData).subscribe(result => {
            console.log(result);
        }, error => console.error(error));
    }
}

