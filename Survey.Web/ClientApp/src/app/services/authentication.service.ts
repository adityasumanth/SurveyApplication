import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';
import { error } from '@angular/compiler/src/util';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  baseUrl: string;
  public isLoggedIn: boolean = false;
  public byGoogle: boolean = false;
  public byLinkedIn: boolean = false;
  public auth2: any;
  public user: User;
  public token: string = "";


  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.user = new User();
    if (this.currentUserSubject.value != null) {
      this.isLoggedIn = true;
    }
  }

  public get currentUserValue(): User {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    return this.currentUserSubject.value;
  }


  login(username: string, password: string) {
    return this.http.post<User>(this.baseUrl + `api/User/authenticate`, { username, password })
      .pipe(map(user => {
        if (user.password == null) {
          return user;
        }
        else if (!user.isAdmin) {
          return user;
        }
        let userToken: any = { username: username, firstName: user.firstName, token: user.token };

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(userToken));
        this.currentUserSubject.next(user);
        this.isLoggedIn = true;
        return user;
      }));
  }

  logout() {
    if (this.byGoogle) {
      this.logoutFromGoogle(this.auth2);
    }
    if (this.byLinkedIn) {
      this.logoutWithLinkedIn();
    }
    this.isLoggedIn = false;
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  loginWithGoogle(email: string, givenName: string, familyName: string, token: string, auth2: any): Observable<User> {
    this.byGoogle = true;
    this.auth2 = auth2;
    let userToken: any = { username: email, firstName: givenName, token: token };
    localStorage.setItem('currentUser', JSON.stringify(userToken));
    this.isLoggedIn = true;
    this.user.username = email;
    this.user.firstName = givenName;
    this.user.lastName = familyName;
    this.user.isAdmin = false;
    this.user.password = "Google";
    this.token = token;
    return this.http.post<User>(this.baseUrl + 'api/User/getUserAdminStatus', this.user);
  }
  setUser(result: User) {
    this.user.isAdmin = result.isAdmin;
    this.user.token = this.token;
    this.currentUserSubject.next(this.user);
  }

  logoutFromGoogle(auth2: any) {
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.byGoogle = false;
  }
  CreateOrUpdateUserWithLinkedIn(data, token): Observable<User> {
    var user=this.getUserFromData(data, token);
    this.byLinkedIn = true;
    return this.http.post<User>(this.baseUrl + 'api/User/getUserByUpdatingToken', user);
  }
  setLinkedInUser(response: User) {
    this.currentUserSubject.next(response);
    let userToken: any = { username: response.username, firstName: response.firstName, token: response.token };
    localStorage.setItem('currentUser', JSON.stringify(userToken));
    this.isLoggedIn = true;
  }
  loginWithLinkedIn(data, token): Observable<User> {
    var user = this.getUserFromData(data, token);
    this.byLinkedIn = true;
    return this.http.post<User>(this.baseUrl + 'api/User/getUser', user);    
  }
  getUserFromData(data,token) : User {
    var user = new User();
    user.firstName = data['localizedFirstName'];
    user.lastName = data['localizedLastName'];
    user.isAdmin = false;
    user.token = token;
    user.password = "LinkedIn";
    user.userId = data['id'];
    user.username = user.firstName + " " + user.lastName;
    return user;
  }
  logoutWithLinkedIn() {
    this.byLinkedIn = false;
    localStorage.removeItem('linkedInAccessToken');
  }
}
