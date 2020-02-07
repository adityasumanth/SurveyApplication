import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyForm } from '../models/SurveyForm';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class SurveyCrudService {
    baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  getSurveyForms(): Observable<SurveyForm[]> {
   
    return this.http.get<SurveyForm[]>(this.baseUrl + 'api/home');
  }
  handleError(error: any) {
    let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }
}
