import { Injectable } from '@angular/core';
import { SurveyForm, User, SurveyQuestion, SurveyOption } from '../models';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FormService {
  public currentUserObservable: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;
  public isLoggedIn: boolean = false;
  public currentUser: User;
  public currentForm: SurveyForm;
  public newQuestion: SurveyQuestion;
  public questionsLength: number = 0;

  constructor(private http: HttpClient) {
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
    for (let i = 0; i < 3; i++) {
      this.currentForm.questions[0].options.push(new SurveyOption());
    }
    this.questionsLength++;
    return this.currentForm;
  }

  AddQuestion(): SurveyForm {
    this.currentForm.questions.push(new SurveyQuestion());
    this.currentForm.questions[this.questionsLength].options = [];
    for (let i = 0; i < 2; i++) {
      this.currentForm.questions[this.questionsLength].options.push(new SurveyOption());
    }
    this.currentForm.questions[this.questionsLength].type = 2;
    this.questionsLength++;
    return this.currentForm;
  }

  deleteQuestion(qid: number): SurveyForm {
    this.currentForm.questions.splice(qid, 1);
    return this.currentForm;
  }

  AddOption(qid: number): SurveyForm {
    this.currentForm.questions[qid].options.push(new SurveyOption());
    var length = this.currentForm.questions[qid].options.length;
    return this.currentForm;
  }

  deleteOption(qid: number, oid: number): SurveyForm {
    this.currentForm.questions[qid].options.splice(oid, 1);
    return this.currentForm;
  }
}
