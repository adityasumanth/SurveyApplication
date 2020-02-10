import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyForm } from '../models/SurveyForm';
import { SurveyOption } from '../models/SurveyOption';
import { SurveyQuestion } from '../models/SurveyQuestion';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {
  public surveyNameForm: FormGroup;
  public survey: SurveyForm;
  public questions: SurveyQuestion[];
  public questionForm: FormGroup;
  public options: SurveyOption[];
  public http: HttpClient;
  public url: string;
  public optionForm: FormGroup;
  public newForm = true;
  public loading = true;
  public surveyName: string = '';

  constructor(private route: ActivatedRoute, http: HttpClient, @Inject('BASE_URL') baseUrl: string, private formBuilder: FormBuilder) {
    this.http = http;
    this.url = baseUrl;
    this.survey = new SurveyForm();
    this.newForm = true;
  }

  ngOnInit() {
    this.surveyNameForm = this.formBuilder.group({
      title: ['']
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
    this.newForm = false;
    this.surveyName = this.f.title.value;
    this.loading = false;
    this.questions = [];
    this.options = [];
  }

  CreateForm() {
    this.loading = false;
    this.survey = new SurveyForm();
    this.survey.questions = this.questions;
    this.survey.title = this.surveyName;
    this.http.post<SurveyForm>(this.url + 'api/Home/addForm', this.survey).subscribe(result => {
      console.log(result);
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
    })
  }
}
