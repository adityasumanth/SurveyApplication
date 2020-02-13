import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyForm, SurveyOption, SurveyQuestion } from '../../models';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';

@Component({
    selector: 'app-update-survey',
    templateUrl: './update-survey.component.html',
    styleUrls: ['./update-survey.component.css']
})

export class UpdateSurveyComponent implements OnInit {
    public currentSurvey: SurveyForm;
    public questions: SurveyQuestion[];
    public questionForm: FormGroup;
    public options: SurveyOption[];
    public http: HttpClient;
    public url: string;
    public optionForm: FormGroup;
    public loading = true;
    public surveyName: string = '';
    public Description: string = "";
    id: number;

    constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder, private surveyService: SurveyService) {
        this.http = http;
        this.url = baseUrl;
        this.survey = new SurveyForm();
    }

    ngOnInit() {
      this.route.paramMap.subscribe(params => {
        this.id = Number(params.get('id'));
        this.surveyService.getSurveyFormById(this.id).subscribe(result => {
          this.survey = result;
          console.log(this.survey.title + this.survey.description);
        }, error => console.log(error));
      });
      this.questions = this.survey.questions;
      this.surveyNameForm = this.formBuilder.group({
        title: [''],
        description: ['']
        });
        this.questionForm = this.formBuilder.group({
            question: [''],
            type: []
        });
        this.optionForm = this.formBuilder.group({
            optionValue: ['']
        });
    }

    get f() { return this.surveyNameForm.controls; }

    get q() { return this.questionForm.controls; }

    get o() { return this.optionForm.controls; }

    onNameSubmit() {
        this.surveyName = this.f.title.value;
        this.Description = this.f.description.value;
        this.loading = false;
        this.questions = [];
        this.options = [];
    }

    

    CreateForm() {
        this.loading = false;
        this.survey = new SurveyForm();
        this.survey.questions = this.questions;
        this.survey.title = this.surveyName;
        this.survey.description = this.Description;
        this.survey.createdBy = 1;
        this.survey.isActive = true;

        this.surveyService.postNewSurvey(this.survey).subscribe(result => {
            window.location.href = "/admin";
        }, error => console.error(error));
    }

    question: SurveyQuestion;
    AddQuestion() {
        console.log(this.q.question.value + '  ' + this.q.type.value);
        this.question = new SurveyQuestion();
        this.question.question = this.q.question.value;
        this.question.type = 2;
        this.question.options = this.options;
        this.questions.push(this.question);
        this.options = [];
        this.questionForm = this.formBuilder.group({
            question: [''],
            type: []
        });
        this.optionForm = this.formBuilder.group({
            optionValue: ['']
        });
        console.log("Add Question");
    }

    option: SurveyOption;
    AddOption() {
        console.log(this.o.optionValue.value);
        this.option = new SurveyOption();
        this.option.optionValue = this.o.optionValue.value;
        this.options.push(this.option);
        this.optionForm = this.formBuilder.group({
            optionValue: ['']
        });
    }
}
