import { Component, OnInit } from '@angular/core';
import { SurveyForm } from '../../models';
import { SurveyService } from '../../services/survey.service';
import { FormService } from '../../services/form.service';
import { Observable } from 'rxjs';
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
    public error: boolean = false;
    public errorMsg: string = '';
    
    constructor(private formService: FormService, private surveyService: SurveyService, private router: Router) {
    }

    ngOnInit() {

    }

    generateNewForm(): any {
        if (this.title == '' ) {
            this.formError = 'Enter a valid title';
            this.error = true;
        }
        else if (this.description == '') {
            this.formError = 'Please Enter Description';
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
        this.error = false;
        this.currentForm = this.formService.AddQuestion();
        this.error = false;
    }

    deleteQuestion(qid: number) {
        this.error = false;
        if (this.currentForm.questions.length == 1) {
            this.errorMsg = 'A minimum of 1 Question is required';
            this.error = true;
        }
        else if (qid < this.currentForm.questions.length) {
            this.formService.deleteQuestion(qid);
        }
    }

    addOption(i: number) {
        this.error = false;
        if (i < this.currentForm.questions.length) {
            var length = this.currentForm.questions[i].options.length;
            if (this.currentForm.questions[i].options[length - 1].optionValue == '') {

            }
            this.currentForm = this.formService.AddOption(i);
        }
        this.error = false;

    }

  createForm() {
    console.log(this.currentForm);
        this.surveyService.postNewSurvey(this.currentForm).subscribe(result => {
            this.router.navigate(['/']);
        }, error => {
            console.error(error); 
        });
        }

    deleteOption(qid: number, oid: number) {
        this.error = false;
        if (qid < this.currentForm.questions.length) {
            if (this.currentForm.questions[qid].options.length == 2) {
                this.errorMsg = 'A minimum of 2 Options are required';
                this.error = true;
            }
            else if (oid < this.currentForm.questions[qid].options.length) {
                this.formService.deleteOption(qid, oid);
            }
        }
    }
    closeAlert() {
        this.error = false;
    }
}
