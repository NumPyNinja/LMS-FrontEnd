import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  url: string = '/api/programbatch';
  
  constructor(private httpClient: HttpClient) {}


  
  getBatchList(): Observable<any> {
     return this.httpClient.get<any>('assets/Batch.json')
   // return this.httpClient.get<any[]>(this.url+'/addView');
  }


}
