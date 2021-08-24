
import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';
import { FilterService } from 'src/services/filter.service';
import { WebworkerServiceService } from 'src/services/webworker-service.service';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.css']
})
export class AppInfoComponent implements OnInit {
  @Input() countries: any[] = [];
  @Input() worldInfo: any;
  // public top10: any[] = [];
  public currentCountry:any;
  public allData:boolean;
  @Output() mapChanged:EventEmitter<any> = new EventEmitter<any>();
  constructor(private webworker: WebworkerServiceService,private filter:FilterService) { }

  ngOnInit(): void {
    console.log(this.countries)
    console.log("/////////////////")
  }

  public getCurrentCountryInfo(item: any) {
    if (item == "WorldWide") {
      this.worldInfo = JSON.parse(localStorage.getItem("worldinfo"));
      this.allData = true;
      return;
    }
    this.webworker.getCurrentCountry(item).subscribe(res => {
      this.currentCountry = res; 
      this.worldInfo = res;
    });
   }
}
