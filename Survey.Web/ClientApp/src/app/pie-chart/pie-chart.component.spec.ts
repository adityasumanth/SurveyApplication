/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { PieChartComponent } from './pie-chart.component';

let component: PieChartComponent;
let fixture: ComponentFixture<PieChartComponent>;

describe('PieChart component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PieChartComponent],
            imports: [BrowserModule],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(PieChartComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});
