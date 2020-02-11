/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SurveyResultsComponent } from './survey-results.component';

let component: SurveyResultsComponent;
let fixture: ComponentFixture<SurveyResultsComponent>;

describe('SurveyResults component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SurveyResultsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SurveyResultsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});