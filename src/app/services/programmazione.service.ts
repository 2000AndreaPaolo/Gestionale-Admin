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

  loadProgrammazioni(): void {
    this.http.get<Programmazioni[]>(environment.apiUrl + '/admin/programmazione').subscribe(res => this.programmazioni.next(res));
  }

  addProgrammazione(programmazione: Programmazione){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + `/admin/programmazione`, JSON.stringify(programmazione), { headers: headers });
  }

  modifyProgrammazione(programmazione: Programmazione){
    let headers = new HttpHeaders({});
    return this.http.put(environment.apiUrl + `/admin/programmazione`, JSON.stringify(programmazione), { headers: headers });
  }

  deleteProgrammazione(id_programmazione: Programmazione){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', environment.apiUrl + `/admin/programmazione`, { body: { headers: headers, id_programmazione: id_programmazione } });
  }
}
