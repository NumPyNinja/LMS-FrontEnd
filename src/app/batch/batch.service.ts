import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Batch } from './batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {

  url: string = '/api';

  constructor(private httpClient: HttpClient) { }

  getBatchList(): Observable<Batch[]> {
    //return this.httpClient.get<Batch[]>('assets/Batch.json');
   return this.httpClient.get<Batch[]>(this.url + "/batches");
  }

  addBatch(bacth: Batch): Observable<Batch> {
    return this.httpClient.post<Batch>(this.url + "/batches", bacth);
  }

  updateBatch(bacth: Batch) {
    return this.httpClient.put<Batch>(this.url + "/batches" + bacth.batchId, bacth);
  }

  deleteBatch(batch: Batch) {
    return this.httpClient.delete<Batch>(this.url + "/batches" + batch.batchId);
  }

}
