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

  getSurveyFormsAsUser(): Observable<SurveyForm[]> {
    return this.http.get<SurveyForm[]>(this.baseUrl + 'api/home/user-surveys');
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

  public changeAccess(id: number): Observable<SurveyForm> {
    return this.http.put<SurveyForm>(this.baseUrl + 'api/home/changeAccess', id);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + 'api/user/register', user);
  }

  getUserByEmail(email: string, password: string): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'api/User/data/' + email)
      .pipe(map(user => {
        if (user.token == password) {
          return user;
        }
        user.firstName = 'Guest';
        return user;
      }));
  }

  handleError(error: any) {
    let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
    console.error(errorMsg);
    return Observable.throw(errorMsg);
  }
}
