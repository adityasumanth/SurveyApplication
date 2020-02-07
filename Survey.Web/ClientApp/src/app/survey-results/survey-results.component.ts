import { Component } from '@angular/core';
import { SurveyForm } from '../models/SurveyForm';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
/** SurveyResults component*/
export class SurveyResultsComponent {
  /** SurveyResults ctor */
  surveyForm: SurveyForm;
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.surveyForm = new SurveyForm().deserialize(params);
      });
  }
}
