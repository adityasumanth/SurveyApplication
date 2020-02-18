/// <reference path="../../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AuthenticateComponent } from './authenticate.component';

let component: AuthenticateComponent;
let fixture: ComponentFixture<AuthenticateComponent>;

describe('authenticate component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AuthenticateComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AuthenticateComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});