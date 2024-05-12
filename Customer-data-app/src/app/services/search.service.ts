import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }
  searchValue:string;
  invokeEvent: Subject<any> = new Subject(); 

  callSecondComponent() { 
    this.invokeEvent.next(this.searchValue);   
  }
}
