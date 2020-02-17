import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateSurveyComponent } from './admin/update-survey/update-survey.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SurveysListComponent } from './surveys/surveys-list/surveys-list.component';
import { AddSurveyComponent } from './surveys/add-survey/add-survey.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminHomeDoopComponent } from './admin/admin-home-doop/admin-home-doop.component';
import { AdminSurveyDetailsComponent } from './admin/admin-survey-details/admin-survey-details.component';
import { CreateSurveyComponent } from './admin/create-survey/create-survey.component';
import { SurveyService } from './services/survey.service';
import { SurveyDetailsComponent } from './surveys/survey-details/survey-details.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { FormService } from './services/form.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SurveysListComponent,
        AddSurveyComponent,
        SurveyDetailsComponent,
        LoginComponent,
        RegisterComponent,
        AdminHomeComponent,
        AdminHomeDoopComponent,
        UpdateSurveyComponent,
        AdminSurveyDetailsComponent,
        CreateSurveyComponent,
        PieChartComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        ChartsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent, pathMatch: 'full' },
            { path: 'surveys', component: SurveysListComponent },
            { path: 'survey/:id', component: AddSurveyComponent },
            { path: 'results/:id', component: SurveyDetailsComponent },
            { path: 'admin', component: AdminHomeDoopComponent, children: [
              { path: '', component: AdminHomeComponent },
              { path: 'addsurvey', component: CreateSurveyComponent },
              { path: 'details/:id', component: AdminSurveyDetailsComponent },
              { path: 'update/:id', component: UpdateSurveyComponent } ]
            },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ])
  ],
  providers: [SurveyService, FormService],
    bootstrap: [AppComponent]
})
export class AppModule { }
