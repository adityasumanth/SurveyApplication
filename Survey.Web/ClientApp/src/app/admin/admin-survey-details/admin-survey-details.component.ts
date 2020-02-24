import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { SurveyForm, SurveyData } from '../../models';

@Component({
  selector: 'app-admin-survey-details',
  templateUrl: './admin-survey-details.component.html',
  styleUrls: ['./admin-survey-details.component.css']
})
/** admin-survey-details component*/
export class AdminSurveyDetailsComponent implements OnInit {
  public survey: SurveyForm;
  public id: number;
  /** admin-survey-details ctor */
  constructor(private route: ActivatedRoute, private surveyService: SurveyService, private router: Router) {
    this.survey = new SurveyForm();
  }

  changeState(id: number) {
    this.surveyService.changeState(id).subscribe(result => {
      this.survey = result;
      this.router.navigate(['/admin']);
    }, error => console.log(error));
  }

  changeAccess(id: number) {
    this.surveyService.changeAccess(id).subscribe(result => {
      this.survey = result;
      this.router.navigate(['/admin']);
    }, error => console.log(error));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.surveyService.getSurveyFormById(this.id).subscribe(result => {
        this.survey = result;
      }, error => console.log(error));
    });
  }
}
