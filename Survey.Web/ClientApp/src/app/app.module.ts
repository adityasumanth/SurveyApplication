import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SurveysComponent } from './surveys/surveys.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { SurveyCrudService } from './services/survey-crud.service';
import { SurveyResultsComponent } from './survey-results/survey-results.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SurveysComponent,
    NewSurveyComponent,
    SurveyResultsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'surveys', component: SurveysComponent },
      { path: 'new-survey/:id', component: NewSurveyComponent },
      { path: 'results', component: SurveyResultsComponent }
    ])
  ],
  providers: [SurveyCrudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
