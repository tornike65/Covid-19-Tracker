import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { EventEmitter } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class WebworkerServiceService {

  constructor(private httpClient: HttpClient) { }
  filteredCollectionChangeEmiter:EventEmitter<any> = new EventEmitter();
  getAllCountry(){
    return this.httpClient.get("https://disease.sh/v3/covid-19/countries").pipe(map((o:any)=>{
      return o;
    }))
  }

  getAll(){
    return this.httpClient.get("https://disease.sh/v3/covid-19/all").pipe(map((o:any)=>{
      return o;
    }))
  }

  getCurrentCountry(country:string){
    return this.httpClient.get(`https://disease.sh/v3/covid-19/countries/${country}`).pipe(map((o:any)=>{
      return o;
    }))
  }

   getCoronavirusCasesHistoryLast120Day(){
    return this.httpClient.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120").pipe(map((o:any)=>{
      return o;
    }))
   }
}
 