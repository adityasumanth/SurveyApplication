import { Component, ChangeDetectorRef } from '@angular/core';
import { SurveyForm } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent {
    surveys: SurveyForm[] = new Array();

    constructor(private surveyService: SurveyService, private router: Router) {
        if (this.surveyService.isLoggedIn == false) {
            this.router.navigate(['/login']);
        }
        this.surveyService.getSurveyFormsAsAdmin().subscribe(forms => this.loadData(forms));
    }

    loadData(forms) {
        this.surveys = forms;
    }
    titleOnHover(survey: SurveyForm) {
        var title = 'Description : '+ survey.description + '\n' +'Created By : '+ survey.createdBy;
        return title;
    }
}
