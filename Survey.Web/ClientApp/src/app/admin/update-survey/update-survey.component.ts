import { Component, OnInit } from '@angular/core';
import { SurveyForm, UpdateSurvey } from '../../models';
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
  public updateSurvey: UpdateSurvey;
  public deletedQuestionIds: number[];
  public deletedOptionIds: number[];

  constructor(private route: ActivatedRoute, private formService: FormService, private surveyService: SurveyService, private router: Router) {
    this.currentForm = new SurveyForm();
    this.route.paramMap.subscribe(params => {
      this.sid = Number(params.get('id'));
      this.surveyService.getSurveyFormById(this.sid).subscribe(result => {
        this.currentForm = result;
        this.formService.loadForm(this.currentForm);
      },
        error => console.log(error));
    });
    this.deletedQuestionIds = [];
    this.deletedOptionIds = [];
  }

  ngOnInit() {    
  }

  deleteOption(qid: number, oid: number): SurveyForm {
    if (qid < this.currentForm.questions.length) {
      if (oid < this.currentForm.questions[qid].options.length) {
        if (this.currentForm.questions[qid].options[oid].id != 0) {
          this.deletedOptionIds.push(this.currentForm.questions[qid].options[oid].id);
        }
        this.currentForm=this.formService.deleteOption(qid, oid);
      }
    }
    return this.currentForm;
  }

  addOption(qid: number): SurveyForm {
    if (qid < this.currentForm.questions.length) {
      this.currentForm = this.formService.AddOption(qid);
    }
    return this.currentForm;
  }

  deleteQuestion(qid: number): SurveyForm {
    if (qid < this.currentForm.questions.length) {
      if (this.currentForm.questions[qid].id != 0) {
        this.deletedQuestionIds.push(this.currentForm.questions[qid].id);
      }
      this.currentForm = this.formService.deleteQuestion(qid);
    }
    return this.currentForm;
  }

  addQuestion(): SurveyForm {
    this.currentForm = this.formService.AddQuestion();
    return this.currentForm;
  }

  UpdateForm() {
    console.log(this.currentForm);
    this.updateSurvey = new UpdateSurvey();
    this.updateSurvey.surveyForm = <SurveyForm>this.currentForm;
    this.updateSurvey.deletedQuestionIds = this.deletedQuestionIds;
    this.updateSurvey.deletedOptionIds = this.deletedOptionIds;
    this.surveyService.putNewSurvey(this.updateSurvey).subscribe(result => {
      this.router.navigate(['../../']);
    }, error => {
      console.error(error);
    });
  }
}
