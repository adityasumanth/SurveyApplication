import { Component, Input } from '@angular/core';
import { PieChartContents } from '../models/PieChartData';
import { ChartOptions } from 'chart.js';


@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.css']
})
/** PieChart component*/
export class PieChartComponent {

    public pieChartOptions: ChartOptions;
    /** PieChart ctor */
    @Input() pieChartContents: PieChartContents;
    public pieChartType: string = 'pie';
    constructor() {
        this.pieChartOptions = {
            legend: {
                display: true,
                labels: {
                    fontColor: 'white', // legend color (can be hexadecimal too)
                }
            }
        }
    }
    public chartClicked(e: any): void {
        //console.log(e);
    }

    public chartHovered(e: any): void {
        //console.log(e);
    }

}
