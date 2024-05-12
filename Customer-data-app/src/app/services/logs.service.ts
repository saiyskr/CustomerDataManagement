import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogs, IPaginatedResults } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http:HttpClient) { }
  apiurl = 'https://localhost:7252/api/Logs';


  // to get the list of all the logs
  getLogs(startIndex,pageSize){
    return this.http.get<IPaginatedResults<ILogs>>(`${this.apiurl}?startIndex=${startIndex}&pageSize=${pageSize}`);
  }

  addLog(data:ILogs){
    return this.http.post(this.apiurl, data);
  }

  searchLogs(data:string){
    return this.http.get<ILogs[]>(`${this.apiurl}$like?search=${data}`);
  }
}
