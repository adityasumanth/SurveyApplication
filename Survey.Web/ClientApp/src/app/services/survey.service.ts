import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SurveyForm, SurveyData, User, UpdateSurvey } from '../models';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable()
export class SurveyService {
    baseUrl: string;
    private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public isLoggedIn: boolean = false;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      this.baseUrl = baseUrl;
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
      if (this.currentUserSubject.value != null) {
        this.isLoggedIn = true;
      }
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

    public currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<User>(this.baseUrl + `api/Home/authenticate`, { username, password })
        .pipe(map(user => {
            if (user.password == null) {
                return user;
            }
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.isLoggedIn = true;
            this.currentUserSubject.next(user);
            return user;
        }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoggedIn = false;
        this.currentUserSubject.next(null);
    }

    handleError(error: any) {
        let errorMsg = error.message || `Yikes! There was a problem with our hyperdrive device and we couldn't retrieve your data!`
        console.error(errorMsg);
        return Observable.throw(errorMsg);
    }
}
