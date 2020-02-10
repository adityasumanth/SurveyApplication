/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SubmitSurveyComponent } from './submit-survey.component';

let component: SubmitSurveyComponent;
let fixture: ComponentFixture<SubmitSurveyComponent>;

describe('new-survey component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SubmitSurveyComponent],
            imports: [BrowserModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SubmitSurveyComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
