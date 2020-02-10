import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SurveyForm } from '@app/models/SurveyForm';
import { SurveyCrudService } from '../services/survey-crud.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent{
  surveyForms: SurveyForm[]=new Array();
  constructor(private surveyCRUDService: SurveyCrudService) {
    this.surveyCRUDService.getSurveyForms().subscribe(forms => this.loadData(forms));
  }
  loadData(forms) {
    this.surveyForms = forms;
  }
}
