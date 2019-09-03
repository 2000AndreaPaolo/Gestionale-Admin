import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Programmazioni } from '../model';
import { Programmazione } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class ProgrammazioneService {
  private programmazioni:Subject<Programmazioni[]>;

  constructor(private http: HttpClient){
    this.programmazioni = new Subject<Programmazioni[]>();
  }

  getProgrammazioni(): Observable<Programmazioni[]> {
    return this.programmazioni.asObservable();
  }

  loadProgrammazioni(id_programma:number): void {
    let headers = new HttpHeaders({});
    this.http.post<Programmazioni[]>('/admin/get/programmazione', JSON.stringify(id_programma), { headers: headers }).subscribe(res => this.programmazioni.next(res));
  }

  addProgrammazione(programmazione: Programmazione){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/programmazione`, JSON.stringify(programmazione), { headers: headers });
  }

  modifyProgrammazione(programmazione: Programmazione){
    let headers = new HttpHeaders({});
    return this.http.put(`/admin/programmazione`, JSON.stringify(programmazione), { headers: headers });
  }

  deleteProgrammazione(id_programmazione: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', `/admin/programmazione`, { body: { headers: headers, id_programmazione: id_programmazione } });
  }

  getProgrammazione(id_programma: number){
    let headers = new HttpHeaders({});
    return this.http.post('/admin/get/programmazione', JSON.stringify(id_programma), { headers: headers });
  }
}
