import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Programmi } from '../model';
import { Programma } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class ProgrammaService {
  private programmi:Subject<Programmi[]>;

  constructor(private http: HttpClient){
    this.programmi = new Subject<Programmi[]>();
  }

  getProgrammi(): Observable<Programmi[]> {
    return this.programmi.asObservable();
  }

  loadProgrammi(): void {
    this.http.get<Programmi[]>('/admin/programma').subscribe(res => this.programmi.next(res));
  }

  addProgramma(Programma: Programma){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/programma`, JSON.stringify(Programma), { headers: headers });
  }

  modifyProgramma(Programma: Programma){
    let headers = new HttpHeaders({});
    return this.http.put(`/admin/programma`, JSON.stringify(Programma), { headers: headers });
  }

  deleteProgramma(id_Programma: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', `/admin/programma`, { body: { headers: headers, id_programma: id_Programma } });
  }
}
