import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { User } from '../models';
import { AuthenticationService } from '../services/authentication.service';
import { SurveyService } from '../services/survey.service';

@Component({
  templateUrl: './register.component.html',
  styles: [`.text-center > button { margin-right: 25px; }`]})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private surveyService: SurveyService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue && this.authenticationService.currentUserValue.isAdmin) {
      this.router.navigate(['/admin']);
    }
    else if (this.authenticationService.currentUserValue && !this.authenticationService.currentUserValue.isAdmin) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.user = new User();
    this.user.firstName = this.f.firstName.value;
    this.user.lastName = this.f.lastName.value;
    this.user.email = this.f.email.value;
    this.user.password = this.f.password.value;
    this.user.isAdmin = false;
    this.user.token = '';
    this.user.userId = this.f.email.value;
    this.surveyService.register(this.user)
      .pipe(first())
      .subscribe(
        data => {
          if (data.userId == null) {
            this.error = 'Not Registered';
          }
          else {
            this.router.navigate(['/'])
          }
        });
    this.loading = false;
  }
}
