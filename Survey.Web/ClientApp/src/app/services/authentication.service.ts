import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    public isLoggedIn: boolean = false;
    baseUrl: string;
    public isLoggedIn: boolean = false;
    public byGoogle: boolean = false;
    public auth2: any;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.baseUrl = baseUrl;
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
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
                this.isLoggedIn = true;
                this.currentUserSubject.next(user);
                this.isLoggedIn = true;
                return user;
            }));
    }

    logout() {
        if (this.byGoogle) {
            this.logoutFromGoogle(this.auth2);
        }
        this.isLoggedIn = false;
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.isLoggedIn = true;
        this.currentUserSubject.next(null);
    }

    loginWithGoogle(username: string, givenName: string, familyName: string, token: string, auth2: any) {
        this.byGoogle = true;
        this.auth2 = auth2;
        let userToken: any = { username: username,firstName:givenName, token: token };
        localStorage.setItem('currentUser', JSON.stringify(userToken));
        this.isLoggedIn = true;
        let user: User = new User();
        user.firstName = givenName;
        user.lastName = familyName;
        user.isAdmin = true;
        user.password = null;
        user.token = token;
        this.currentUserSubject.next(user);
        return user;
    }
    logoutFromGoogle(auth2: any) {
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        this.byGoogle = false;
    }
}
