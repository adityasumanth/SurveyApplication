/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SurveysListComponent } from './surveys-list.component';

let component: SurveysListComponent;
let fixture: ComponentFixture<SurveysListComponent>;

describe('Surveys component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SurveysListComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SurveysListComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
