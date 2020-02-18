import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SurveyForm, SurveyData, UpdateSurvey, User } from '../models';
@Injectable()

export class SurveyService {
    baseUrl: string;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    getSurveyForms(): Observable<SurveyForm[]> {
        return this.http.get<SurveyForm[]>(this.baseUrl + 'api/home/surveys');
    }

    getSurveyFormsAsAdmin(): Observable<SurveyForm[]> {
        return this.http.get<SurveyForm[]>(this.baseUrl + 'api/home/admin-surveys');
    }

    getSurveyFormById(id: Number): Observable<SurveyForm> {
        return this.http.get<SurveyForm>(this.baseUrl + 'api/home/survey/' + id);
    }

    getPollDataByFormId(id: Number): Observable<SurveyData[]> {
        return this.http.get<SurveyData[]>(this.baseUrl + 'api/home/pollData/' + id);
    }

    postPollData(pollData: SurveyData): Observable<SurveyData> {
        return this.http.post<SurveyData>(this.baseUrl + 'api/Home/pollSurvey', pollData);
    }

    postNewSurvey(survey: SurveyForm): Observable<SurveyForm> {
        return this.http.post<SurveyForm>(this.baseUrl + 'api/Home/addSurvey', survey);
    }

    putNewSurvey(updateSurvey: UpdateSurvey): Observable<SurveyForm> {
        return this.http.put<SurveyForm>(this.baseUrl + 'api/Home/updateSurvey', updateSurvey);
    }

    public changeState(id: number): Observable<SurveyForm> {
        return this.http.put<SurveyForm>(this.baseUrl + 'api/home/changeState', id);
    }

    register(user: User) {
        return this.http.post<User>(this.baseUrl + 'api/home/register', user);
    }

    handleError(error: any) {
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }
}
