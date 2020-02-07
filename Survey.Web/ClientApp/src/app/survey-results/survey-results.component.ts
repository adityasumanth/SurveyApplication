import { Component } from '@angular/core';
import { SurveyForm } from '../models/SurveyForm';
import { ActivatedRoute } from '@angular/router';
import { SurveyCrudService } from '../services/survey-crud.service';
import { SurveyData } from '../models/SurveyData';

@Component({
  selector: 'app-survey-results',
  templateUrl: './survey-results.component.html',
  styleUrls: ['./survey-results.component.css']
})
/** SurveyResults component*/
export class SurveyResultsComponent {
  /** SurveyResults ctor */
  surveyForm: SurveyForm = new SurveyForm();
  surveyPollData: SurveyData[] = new Array();
  surveyId: number;
  public pieChartType: string = 'pie';
  constructor(private route: ActivatedRoute, private surveyCrudService: SurveyCrudService) {

  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.surveyId = Number(params.get('id'));
      this.surveyCrudService.getSurveyFormById(this.surveyId).subscribe(form => this.surveyForm = form);
    });
    this.surveyCrudService.getPollDataByFormId(this.surveyId).subscribe(data => this.loadPollData(data));
  }
  loadPollData(data: SurveyData[]) {
    this.surveyPollData = data;
  }
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  getPieChartData(id: number) {
    var data: number[] = new Array();
    var ques = this.surveyForm.questions.find(q => q.id = id);
    ques.options.forEach(optn => {
      var count = 0;
      this.surveyPollData.forEach(dataEntry => {
        count += dataEntry.surveyAnswers.filter(entry => (entry.answer == optn.id && entry.question == ques.id)).length;
      });
      data.push(count);
    });
    return data;
  }
}

