import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyForm } from '../models/SurveyForm';
import { SurveyOption } from '../models/SurveyOption';
import { SurveyQuestion } from '../models/SurveyQuestion';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {
  surveyNameForm: FormGroup;
  survey: SurveyForm;
  questions: SurveyQuestion[];
  QuestionForm: FormGroup;
  options: SurveyOption[];
  optionForm: FormGroup;
  newForm = true;
  loading = true;
  surveyName: string = '';

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit() {
    this.surveyNameForm = this.formBuilder.group({
      title: ['', Validators.minLength(3)]
    });
    this.QuestionForm = this.formBuilder.group({
      question: [''],
      type: []
    });
    this.optionForm = this.formBuilder.group({
      optionValue: ['']
    });
  }

  get f() { return this.surveyNameForm.controls; }

  get q() { return this.QuestionForm.controls; }

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
    this.survey.surveyQuestions = this.questions;
    this.survey.title = this.surveyName;

  }
  
  question: SurveyQuestion;
  AddQuestion() {
    console.log(this.q.question.value + '  ' + this.q.type.value);
    this.question = new SurveyQuestion();
    this.question.question = this.q.question.value;
    this.question.type = this.q.type.value;
    this.question.options = this.options;
    this.questions.push(this.question);
    this.options = [];
    this.QuestionForm = this.formBuilder.group({
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
