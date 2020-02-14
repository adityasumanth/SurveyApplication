import { Injectable } from '@angular/core';
import { SurveyForm, User, SurveyQuestion, SurveyOption } from '../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SurveyService } from './survey.service';

@Injectable()
export class FormService {
  public currentUserObservable: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;
  public isLoggedIn: boolean = false;
  public currentUser: User;
  public currentForm: SurveyForm;
  public newQuestion: SurveyQuestion;

  constructor(private http: HttpClient, private surveyService: SurveyService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserObservable = this.currentUserSubject.asObservable();
    this.currentUser = this.currentUserSubject.value;
    if (this.currentUser != null) {
      this.isLoggedIn = true;
    }
  }

  GenerateForm(title: string, desc: string): SurveyForm {
    this.currentForm = new SurveyForm();
    this.currentForm.title = title;
    this.currentForm.description = desc;
    this.currentForm.isActive = true;
    this.currentForm.createdBy = this.currentUser.userId;
    this.currentForm.questions = [];
      this.currentForm.questions.push(new SurveyQuestion());
      this.currentForm.questions[0].type = 2;
    this.currentForm.questions[0].options = [];
    for (let i = 0; i < 2; i++) {
      this.currentForm.questions[0].options.push(new SurveyOption());
    }
    return this.currentForm;
  }

  loadForm(surveyForm: SurveyForm) {
    this.currentForm = new SurveyForm();
    this.currentForm = surveyForm;
  }

  AddQuestion(): SurveyForm {
    if (this.currentForm.questions.length == 0) {
      this.currentForm.questions = [];
    }
    this.currentForm.questions.push(new SurveyQuestion());
    this.currentForm.questions[this.currentForm.questions.length-1].options = [];
    for (let i = 0; i < 2; i++) {
      this.currentForm.questions[this.currentForm.questions.length-1].options.push(new SurveyOption());
    }
    this.currentForm.questions[this.currentForm.questions.length-1].type = 2;
    this.currentForm.questions[this.currentForm.questions.length-1].id = 0;
    return this.currentForm;
  }

  deleteQuestion(qid: number): SurveyForm {
    if (this.currentForm.questions.length == 1) {
      return this.currentForm;
    }
    this.currentForm.questions.splice(qid, 1);
    console.log('deleted question ' + qid);
    return this.currentForm;
  }

  AddOption(qid: number): SurveyForm {
    if (this.currentForm.questions[qid].options.length == 0) {
      this.currentForm.questions[qid].options = [];
    }
    this.currentForm.questions[qid].options.push(new SurveyOption());
    var length = this.currentForm.questions[qid].options.length;
    return this.currentForm;
  }

  deleteOption(qid: number, oid: number): SurveyForm {
    if (this.currentForm.questions.length == 0) {
      this.currentForm.questions = [];
    }
    this.currentForm.questions[qid].options.splice(oid, 1);
    return this.currentForm;
  }
}
