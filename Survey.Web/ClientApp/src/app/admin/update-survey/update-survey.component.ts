import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SurveyForm, SurveyOption, SurveyQuestion } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SurveyService } from '../../services/survey.service';
import { FormService } from '../../services/form.service';

@Component({
    selector: 'app-update-survey',
    templateUrl: './update-survey.component.html',
    styleUrls: ['./update-survey.component.css']
})

export class UpdateSurveyComponent implements OnInit {
  public currentForm: SurveyForm;
  public sid: number;
  public currentFormValue: Observable<SurveyForm>;
  public newForm: boolean = true;
  public formError: string = '';
  public addQuestionDisable: boolean = true;
  public addOptionDisable: boolean[];
  public questionsLength: number = 0;

  constructor(private route: ActivatedRoute, private formService: FormService, private surveyService: SurveyService, private router: Router) {
    this.currentForm = new SurveyForm();
    this.route.paramMap.subscribe(params => {
      this.sid = Number(params.get('id'));
      this.surveyService.getSurveyFormById(this.sid).subscribe(result => {
        this.currentForm = result;
        this.questionsLength = this.currentForm.questions.length;
        console.log(this.currentForm);
      }, error => console.log(error));
    });
  }

  ngOnInit() {    
  }

  deleteOption(qid: number, oid: number): SurveyForm {
    if (qid < this.questionsLength && qid > 0) {
      if (oid < this.currentForm.questions[qid].options.length && oid > 0) {
        this.currentForm.questions[qid].options.slice(oid, 1);
      }
    }
    return this.currentForm;
  }

  addOption(qid: number): SurveyForm {
    if (qid < this.questionsLength) {
      this.currentForm.questions[qid].options.push(new SurveyOption());
    }
    return this.currentForm;
  }

  deleteQuestion(qid: number): SurveyForm {
    if (qid < this.questionsLength) {
      this.currentForm.questions.slice(qid, 1);
    }
    this.questionsLength--;
    return this.currentForm;
  }

  addQuestion(): SurveyForm {
    this.currentForm.questions.push(new SurveyQuestion());
    this.currentForm.questions[this.questionsLength].options = [];
    for (let i = 0; i < 2; i++) {
      this.currentForm.questions[this.questionsLength].options.push(new SurveyOption());
    }
    this.questionsLength++;
    return this.currentForm;
  }

  UpdateForm() {
    console.log(this.currentForm);

  }
}
