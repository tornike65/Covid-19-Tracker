import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  filteredCollectionChangeEmiter:EventEmitter<any[]> = new EventEmitter();
  filteredbollenChangeEmiter:EventEmitter<boolean> = new EventEmitter();
  constructor() { }
}
