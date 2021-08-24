import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import {AgmCoreModule} from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WebworkerServiceService } from 'src/services/webworker-service.service';
import { from } from 'rxjs';
import { MapComponent } from './map/map.component';
import { AppInfoComponent } from './app-info/app-info.component';
import { CountriesComponent } from './countries/countries.component';
import { ChartComponent } from './chart/chart.component';
import { FilterService } from 'src/services/filter.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AppInfoComponent,
    CountriesComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyB6OOdrxl4YZh7H67DMg4QYghLM8psiJis'
    // })
  ],
  providers: [WebworkerServiceService,FilterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
