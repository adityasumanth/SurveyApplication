import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyForm } from '@app/models/SurveyForm';
import { NgForm, FormGroup, Validators, EmailValidator, FormControl } from '@angular/forms';
import { SurveyData } from '@app/models/SurveyData';
import { SurveyAnswer } from '@app/models/SurveyAnswer';
import { SurveyService } from '@app/services/survey.service';

@Component({
    selector: 'app-add-survey',
    templateUrl: './add-survey.component.html',
    styleUrls: ['./add-survey.component.css']
})
/** new-survey component*/
export class AddSurveyComponent implements OnInit {
    public id: number;
    public survey: SurveyForm;
    public pollData: SurveyData;
    public answers: SurveyAnswer[];
    public email: string;
    public surveyFormGrp: FormGroup;
    public emailFormControl = new FormControl;
    /** new-survey ctor */
    constructor(private route: ActivatedRoute, private surveyService: SurveyService) {
        this.survey = new SurveyForm();
        this.pollData = new SurveyData();
        this.answers = new Array<SurveyAnswer>();
        
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.id = Number(params.get('id'));
            this.surveyService.getSurveyFormById(this.id).subscribe(result => { this.survey = result; }, error => console.log(error));
        });
        this.emailFormControl = new FormControl('', [
            Validators.required,
            Validators.email
        ]);
    }
    
    SubmitForm(form: NgForm) {
        for (let q of this.survey.questions) {
            let answer: SurveyAnswer = new SurveyAnswer();
            answer.surveyQuestionId = q.id;
            answer.surveyOptionId = parseInt(form.value["option-" + q.id]);
            this.answers.push(answer);
        }
        this.pollData = new SurveyData();
        this.pollData.email = this.emailFormControl.value;
        this.pollData.surveyFormID = this.id;
        this.pollData.answers = this.answers;
        this.surveyService.postPollData(this.pollData).subscribe(result => {
            alert('Successfully Posted poll')
            window.location.href = "/surveys";
        }, error => {
            console.error(error); this.pollData = new SurveyData(); this.answers = new Array<SurveyAnswer>()
        });
    }
    
}

