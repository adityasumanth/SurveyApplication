import { Component } from '@angular/core';
import { SurveyForm } from '../models/SurveyForm';
import { SurveyCrudService } from '../services/survey-crud.service';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent {
  surveys: SurveyForm[] = new Array();

  constructor(private surveyCRUDService: SurveyCrudService) {
    this.surveyCRUDService.getSurveyForms().subscribe(forms => this.loadData(forms));
  }

  loadData(forms) {
    this.surveys = forms;
  }

  getForm(id: number) {
    return this.surveys.find(form => form.id == id);
  }
}
