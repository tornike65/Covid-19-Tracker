import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { WebworkerServiceService } from 'src/services/webworker-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  @Input() countries: any[] = [];
  public history: any[] = [];
  constructor(private web: WebworkerServiceService) {

  }

  ngOnInit(): void {
    this.getVirusHistory();
  }

  public getVirusHistory() {
    this.web.getCoronavirusCasesHistoryLast120Day().subscribe(res => {
      let lastDataPoint;
      for (let date in res.cases) {
        if (lastDataPoint) {
          let newDataPoint = {
            x: date,
            y: res.cases[date] - lastDataPoint,
          };
          this.history.push(newDataPoint);
        }
        lastDataPoint = res.cases[date];
      }
      var myChart = new Chart("myChart", {
      type: 'line',
      data: {
        labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
          label: 'Cases',
          data: [this.history[3].y, this.history[34].y, this.history[64].y, this.history[95].y, this.history[118].y],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',


          ],
          borderColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',
            'rgba(255, 99, 132, 0.5)',

          ],
          borderWidth: 1
        },
        ]
      },

      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    })
  }
}
