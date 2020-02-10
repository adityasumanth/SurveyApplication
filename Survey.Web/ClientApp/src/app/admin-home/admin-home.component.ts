import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})

export class AdminHomeComponent {
    surveys: SurveyNameId[];

    constructor(private http: HttpClient) {
        this.surveys = [{ id: 1, name: 'food Survey' }];
    }
}
class SurveyNameId {
    id: number;
    name: string;
}
