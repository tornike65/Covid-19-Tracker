import { Component, OnInit, Output } from '@angular/core';
import { WebworkerServiceService } from 'src/services/webworker-service.service';
import { AfterViewInit } from '@angular/core';
import Chart from 'chart.js';


//import { Chart } from 'node_modules/chart.js'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
//'rgba(173,255,47,1)',

export class AppComponent implements OnInit,AfterViewInit {
  title = 'angular-covid-tracker';
  
  public countries: any[] = [];
  public worldInfo: any;
  public top10: any[] = [];
  public countryInfo: any;

  /**
   *
   */
  constructor(private webworker: WebworkerServiceService) {
  }
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {
    this.getCountry();
    this.getWorldWideInfo();
  }
 
  public getCountry() {
    this.webworker.getAllCountry().subscribe(res => {
      this.countries = res;
      this.top10 = this.countries.filter(a=> a.cases > 1000)
      this.top10 = this.top10.sort((a,b)=> (a.cases < b.cases ? 1 : -1))
    })
  }

  public getWorldWideInfo() {
    this.webworker.getAll().subscribe(res => {
      this.worldInfo = res;
    });
  }

}
