/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AdminSurveyDetailsComponent } from './admin-survey-details.component';

let component: AdminSurveyDetailsComponent;
let fixture: ComponentFixture<AdminSurveyDetailsComponent>;

describe('admin-survey-details component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AdminSurveyDetailsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AdminSurveyDetailsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});