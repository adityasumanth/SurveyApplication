import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models';
import { AuthenticationService } from '../services/authentication.service';
import { SurveyService } from '../services/survey.service';
import { LinkedInService } from '../services/linked-in.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private surveyService: SurveyService,
    private linkedInService: LinkedInService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
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
    this.surveyService;
    this.surveyService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data.password == null) {
            this.error = data.firstName;
            this.loading = false;
          }
          else if (data.isAdmin == false)
          {
            this.error = "Contact Admin team for Admin privileges"
            this.loading = false;
          }
          else {
            this.router.navigate([this.returnUrl]);
          }
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
  authenticateUserByLinkedIn() {

  }
}
