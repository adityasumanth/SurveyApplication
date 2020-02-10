import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SurveysComponent } from './surveys/surveys.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { NewSurveyComponent } from './new-survey/new-survey.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveyCrudService } from './services/survey-crud.service';
import { SurveyResultsComponent } from './survey-results/survey-results.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SurveysComponent,
        NewSurveyComponent,
        SurveyResultsComponent,
        AdminHomeComponent,
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
            { path: 'surveys', component: SurveysComponent },
            { path: 'new-survey/:id', component: NewSurveyComponent },
            { path: 'results/:id', component: SurveyResultsComponent },
            { path: 'admin', component: AdminHomeComponent },
            { path: 'addsurvey', component: CreateSurveyComponent }
        ])
    ],
    providers: [SurveyCrudService],
    bootstrap: [AppComponent]
})
export class AppModule { }
