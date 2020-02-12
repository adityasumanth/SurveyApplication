import { Component, OnInit, Inject, Input } from '@angular/core';
import { SurveyForm, SurveyOption, SurveyQuestion } from '../../models';
import { NgForm } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { FormService } from '../../services/form.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})

export class CreateSurveyComponent implements OnInit {
  public currentForm: SurveyForm;
  public currentFormValue: Observable<SurveyForm>;
  public newForm: boolean = true;
  public title: string = '';
  public description: string = '';
  public formError: string = '';
  public addQuestionDisable: boolean = true;
  public addOptionDisable: boolean[];

  constructor(private formService: FormService, private surveyService: SurveyService) {
  }

  ngOnInit() {

  }

  generateNewForm(): any {
    //console.log(this.title + ' form ' + this.description);
    if (this.title == '' || this.description == '') {
      this.formError = 'Enter valid form name';
    }
    else {
      this.currentForm = this.formService.GenerateForm(this.title, this.description);
      //console.log(this.currentForm);
      this.newForm = false;
      this.addOptionDisable = [];
      this.addOptionDisable.push(false);
      return this.currentForm;
    }
  }

  addQuestion() {
    this.currentForm = this.formService.AddQuestion();
  }

  deleteQuestion(qid: number) {
    if (qid < this.currentForm.questions.length) {
        this.formService.deleteQuestion(qid);
    }
  }

  addOption(i: number) {
    if (i < this.currentForm.questions.length) {
      var length = this.currentForm.questions[i].options.length;
      if (this.currentForm.questions[i].options[length - 1].optionValue == '') {

      }
      this.currentForm = this.formService.AddOption(i);
    }
  }

  createForm() {
    console.log(this.currentForm);
    this.currentFormValue = this.surveyService.postNewSurvey(this.currentForm);
    console.log('Return form');
    console.log(this.currentFormValue);
  }

  deleteOption(qid: number, oid: number) {
    if (qid < this.currentForm.questions.length) {
      if (oid < this.currentForm.questions[qid].options.length) {
        this.formService.deleteOption(qid, oid);
      }
    }
  }
}
