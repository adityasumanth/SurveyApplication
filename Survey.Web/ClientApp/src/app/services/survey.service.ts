import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SurveyForm } from '../models/SurveyForm';
import { HttpClient } from '@angular/common/http';
import { SurveyData } from '../models/SurveyData';
@Injectable()
export class SurveyService {
    baseUrl: string;
    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    getSurveyForms(): Observable<SurveyForm[]> {

        return this.http.get<SurveyForm[]>(this.baseUrl + 'api/home/surveys');
    }
    getSurveyFormById(id: Number): Observable<SurveyForm> {
        return this.http.get<SurveyForm>(this.baseUrl + 'api/Home/survey/' + id);
    }
    getPollDataByFormId(id: Number): Observable<SurveyData[]> {
        return this.http.get<SurveyData[]>(this.baseUrl + 'api/Home/pollData/' + id);
    }
    postPollData(pollData: SurveyData): Observable<SurveyData> {
        return this.http.post<SurveyData>(this.baseUrl + 'api/Home/poll', pollData);
    }
    postNewSurvey(survey: SurveyForm): Observable<SurveyForm> {
        return this.http.post<SurveyForm>(this.baseUrl + 'api/Home/addForm', survey);
    }
    handleError(error: any) {
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }
}
