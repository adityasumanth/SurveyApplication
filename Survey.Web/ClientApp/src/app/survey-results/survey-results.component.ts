import { Component, OnInit } from '@angular/core';
import { SurveyForm } from '../models/SurveyForm';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../services/survey.service';
import { SurveyData } from '../models/SurveyData';
import { SurveyQuestion } from '../models/SurveyQuestion';
import { PieChartContents } from '../models/PieChartData';

@Component({
    selector: 'app-survey-results',
    templateUrl: './survey-results.component.html',
    styleUrls: ['./survey-results.component.css']
})
/** SurveyResults component*/
export class SurveyResultsComponent implements OnInit {
    /** SurveyResults ctor */
    surveyForm: SurveyForm;
    id: number;
    pollData: SurveyData[];
    pollResults: Map<SurveyQuestion, PieChartContents>;
    dataInitialised: boolean = false;
    constructor(private route: ActivatedRoute, private surveyService: SurveyService) {
        this.surveyForm = new SurveyForm();
        this.pollData = [];
        this.pollResults = new Map();
    }
    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.id = Number(params.get('id'));
            this.surveyService.getSurveyFormById(this.id).subscribe(result => {
                this.surveyForm = result;
                this.loadData()
            }, error => console.log(error));
        });
    }
    loadData() {
        this.surveyService.getPollDataByFormId(this.id).subscribe(result => {
            this.pollData = result;
            this.setPollResults();
        }, error => console.log(error));
    }
    setPollResults() {
        this.surveyForm.questions.forEach(question => {
            var data: number[] = [];
            var attrs: PieChartContents = new PieChartContents();
            attrs.labels = [];
            question.options.forEach(optn => {
                var count = 0;
                this.pollData.forEach(poll => {
                    poll.answers.forEach(ans => {
                        if (ans.surveyQuestionId == question.id && optn.id == ans.surveyOptionId) {
                            count++;
                        }
                    });
                });
                attrs.labels.push(optn.optionValue);
                data.push(count);
            });
            attrs.data = data;
            this.pollResults.set(question, attrs);
        });
        this.dataInitialised = true;
    }
}

