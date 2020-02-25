import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models';
import { AuthenticationService } from '../services/authentication.service';
import { SurveyService } from '../services/survey.service';
import { DOCUMENT } from '@angular/common';
import { LinkedInService } from '../services/linked-in.service';

declare const gapi: any;


@Component({
  templateUrl: 'login.component.html',
  styles: [`.card-body button { margin-right: 25px; }`]})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  public auth2: any;
  element: any;
  public baseUrl: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private surveyService: SurveyService,
    private linkedInService: LinkedInService,
    @Inject(DOCUMENT) document,
    @Inject('BASE_URL') baseUrl: string,
  ) {
    this.baseUrl = baseUrl;
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.element = document.getElementById('googleBtn');
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  ngAfterViewInit() {
    this.googleInit();
  }
  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '100259007739-30avno7p9u5h7dmmi2vt56o384ffvc6o.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin();
    });
  }
  attachSignin() {
    this.auth2.attachClickHandler(this.element, {},
      (googleUser) => {
        this.loading = true;
        let profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('FirstName: ' + profile.getGivenName());
        console.log('FamilyName: ' + profile.getFamilyName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);

        //YOUR CODE HERE
        this.authenticationService.loginWithGoogle(profile.getEmail(), profile.getGivenName(), profile.getFamilyName(), googleUser.getAuthResponse().id_token, this.auth2).subscribe(result => {
          this.authenticationService.setUser(result);
          this.loading = false;
          window.location.href = this.returnUrl;
        }, error => console.log(error));



      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
        this.loading = false;
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService;
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.password == null) {
            this.error = data.firstName;
            this.loading = false;
          }
          else if (data.isAdmin == false) {
            this.error = "Contact Admin team for Admin privileges"
            window.location.href = this.returnUrl;
          }
          else {
            window.location.href = this.returnUrl;
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
  authenticateUserByLinkedIn() {
    var accessToken=localStorage.getItem('linkedInAccessToken');
    if (accessToken == null) {
      this.generateToken();
    }
    else {
      this.linkedInService.getUserData().subscribe(response => {
        this.authenticationService.loginWithLinkedIn(response, JSON.parse(accessToken)['access_token']).subscribe(response => {
          if (response == null) {
            localStorage.removeItem('linkeInAccessToken');
            this.generateToken();
          }
          else {
            this.authenticationService.setLinkedInUser(response);
            window.location.replace(' ');
          }          
        });
        
      }, error => { this.generateToken() });
    }
  }
  generateToken() {
    window.open(this.linkedInService.login(), '_blank', "width=700,height=900,z-index=-1");
  }

}
