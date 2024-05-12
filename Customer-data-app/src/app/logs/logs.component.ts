import { Component, OnInit } from '@angular/core';
import { LogsService } from '../services/logs.service';
import { ILogs, IPaginatedResults } from '../data-types';
import { Location } from '@angular/common';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  constructor(private searchService:SearchService, private location:Location,  public logSearch:SearchService, private logService:LogsService){
    this.searchService.invokeEvent.subscribe(value => {
      if(value){
       this.searchLogs(value); 
     }
     else{
      this.getLogs();
     }
    });
  }

  logList:ILogs[];
  pageNumber:number =1;
  pageSize:number = 20;
  totalLogs:number;

  ngOnInit(){
    this.getLogs();
  }

  getLogs()
  {
    this.logService.getLogs((this.pageNumber-1)*this.pageSize,this.pageSize).subscribe((result:IPaginatedResults<ILogs>)=>{
      if(result){
        this.logList=result.items;
        this.totalLogs=result.totalCount;
      }
    });
  }

  backButton()
  {
    this.location.back();
  }

  onPageChange(event:number){
    this.pageNumber=event;
    this.getLogs();
  }

  searchLogs(value)
  {
    this.logService.searchLogs(value).subscribe((result)=>{
        if(result)
        {
          this.logList=result;
        }
    });
  }
}
