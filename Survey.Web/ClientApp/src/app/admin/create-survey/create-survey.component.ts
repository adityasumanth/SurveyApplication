import { Component, OnInit, Inject, Input } from '@angular/core';
import { SurveyForm, SurveyOption, SurveyQuestion } from '../../models';
import { NgForm } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { FormService } from '../../services/form.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


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
    public error: boolean=false;
    
    constructor(private formService: FormService, private surveyService: SurveyService, private router: Router) {
    }

    ngOnInit() {

    }

    generateNewForm(): any {
        if (this.title == '' ) {
            this.formError = 'Enter valid form name';
            this.error = true;
        }
        else if (this.description == '') {
            this.formError = 'Description is mandatory';
            this.error = true;
        }
        else {
            this.error = false;
            this.currentForm = this.formService.GenerateForm(this.title, this.description);
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
        this.surveyService.postNewSurvey(this.currentForm).subscribe(result => {
            this.router.navigate(['/']);
        }, error => {
            console.error(error); 
        });
        }

    deleteOption(qid: number, oid: number) {
        if (qid < this.currentForm.questions.length) {
            if (oid < this.currentForm.questions[qid].options.length) {
                this.formService.deleteOption(qid, oid);
            }
        }
    }
}
