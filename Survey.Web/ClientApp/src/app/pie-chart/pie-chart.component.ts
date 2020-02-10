import { Component, Input } from '@angular/core';
import { PieChartContents } from '../models/PieChartData';


@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html'
})
/** PieChart component*/
export class PieChartComponent {

    /** PieChart ctor */
    @Input() pieChartContents: PieChartContents;
    public pieChartType: string = 'pie';
    constructor() {

    }
    public chartClicked(e: any): void {
        //console.log(e);
    }

    public chartHovered(e: any): void {
        //console.log(e);
    }
}
