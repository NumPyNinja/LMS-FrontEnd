import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from './program';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {

   
  url: string = 'https://lms-admin-rest-service.herokuapp.com/programs';

  constructor(private httpClient: HttpClient) {}

  getPrograms(): Observable<Program[]> {
    // return this.httpClient.get<any>('assets/Programs.json')
    return this.httpClient.get<Program[]>(this.url);
  }

  addProgram(program: Program): Observable<Program> {
    program.online = true;
    return this.httpClient.post<Program>(this.url, program);
  }

  editProgram(program: Program) {
    return this.httpClient.put<Program>(this.url + program.programId, program);
  }

  deleteProgram(program: Program) {
    return this.httpClient.delete<Program>(this.url + program.programId);
  }
}
