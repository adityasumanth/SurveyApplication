import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SurveysComponent } from './surveys/surveys.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SurveyCrudService } from './services/survey-crud.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        SurveysComponent,
        FetchDataComponent,
        AdminHomeComponent,
        CreateSurveyComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forRoot([
          { path: '', component: HomeComponent, pathMatch: 'full' },
          { path: 'surveys', component: SurveysComponent },
          { path: 'addsurvey', component: CreateSurveyComponent },
          { path: 'fetch-data', component: FetchDataComponent },
          { path: 'admin', component: AdminHomeComponent },
        ])
  ],
  providers: [SurveyCrudService],
    bootstrap: [AppComponent]
})
export class AppModule { }
