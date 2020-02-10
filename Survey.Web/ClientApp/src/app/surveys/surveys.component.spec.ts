/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SurveysComponent } from './surveys.component';

let component: SurveysComponent;
let fixture: ComponentFixture<SurveysComponent>;

describe('Surveys component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SurveysComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SurveysComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});