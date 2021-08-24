import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { WebworkerServiceService } from 'src/services/webworker-service.service';
@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    @Input() history: any[] = [];
    constructor(private web: WebworkerServiceService) { }

    ngOnInit(): void {
        this.genereteChart()
        // var myChart = new Chart("myChart", {
        //     type: 'line',
        //     data: {
        //         labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
        //         datasets: [{
        //             label: 'Cases',
        //             data: [this.history[3].y, this.history[34].y, this.history[64].y, this.history[95].y, this.history[118].y],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.5)',
        //                 'rgba(255, 99, 132, 0.5)',
        //                 'rgba(255, 99, 132, 0.5)',
        //                 'rgba(255, 99, 132, 0.5)',
        //                 'rgba(255, 99, 132, 0.5)',


        //             ],
        //             borderColor: [
        //                 'rgba(255, 99, 132, 0.5)',
        //                 'rgba(255, 99, 132, 0.5)',
        //                 'rgba(255, 99, 132, 0.5)',
        //                 'rgba(255, 99, 132, 0.5)',
        //                 'rgba(255, 99, 132, 0.5)',

        //             ],
        //             borderWidth: 1
        //         },
        //         ]
        //     },

        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero: true
        //                 }
        //             }]
        //         }
        //     }
        // });
    }


    public genereteChart() {
        
        
        console.log(this.history)
    }

}
