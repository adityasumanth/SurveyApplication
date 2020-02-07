/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { NewSurveyComponent } from './new-survey.component';

let component: NewSurveyComponent;
let fixture: ComponentFixture<NewSurveyComponent>;

describe('new-survey component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NewSurveyComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(NewSurveyComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});