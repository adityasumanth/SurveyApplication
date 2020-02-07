import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {
  surveyNameForm: FormGroup;
  questions: question[];
  newForm = true;
  loading = false;
  surveyName: string = '';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.surveyNameForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
    for()
    this.questions
  }

  get f() { return this.surveyNameForm.controls; }

  onNameSubmit() {
    this.newForm = false;
    this.surveyName = this.f.title.value;
  }

  CreateForm() {
    this.loading = true;
  }
}

class question implements OnInit {
  surveyForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.surveyForm = this.formBuilder.group({
      question: [''],
      option: ['']
    });
  }
}
