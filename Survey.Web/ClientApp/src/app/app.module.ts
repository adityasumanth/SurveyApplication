import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SurveysListComponent } from './surveys/surveys-list/surveys-list.component';
import { AddSurveyComponent } from './surveys/add-survey/add-survey.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminSurveyDetailsComponent } from './admin/admin-survey-details/admin-survey-details.component';
import { CreateSurveyComponent } from './admin/create-survey/create-survey.component';
import { SurveyService } from './services/survey.service';
import { SurveyDetailsComponent } from './surveys/survey-details/survey-details.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SurveysListComponent,
        AddSurveyComponent,
        SurveyDetailsComponent,
        LoginComponent,
        AdminHomeComponent,
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
          {
            path: 'admin', component: AdminHomeComponent, children: [
                  { path: 'addsurvey', component: CreateSurveyComponent },
                  { path: 'details/:id', component: AdminSurveyDetailsComponent }
            ]
          },
            { path: 'login', component: LoginComponent }
        ])
    ],
    providers: [SurveyService],
    bootstrap: [AppComponent]
})
export class AppModule { }
