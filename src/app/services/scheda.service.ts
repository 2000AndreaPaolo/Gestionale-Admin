import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Schede } from '../model';
import { Scheda } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class SchedaService {

  private schede:Subject<Schede[]>;

  constructor(private http: HttpClient){
    this.schede = new Subject<Schede[]>();
  }

  getSchede(): Observable<Schede[]> {
    return this.schede.asObservable();
  }

  loadSchede(): void {
    this.http.get<Schede[]>('/admin/scheda').subscribe(res => this.schede.next(res));
  }

  addScheda(scheda: Scheda){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/scheda`, JSON.stringify(scheda), { headers: headers });
  }

  modifyScheda(scheda: Scheda){
    let headers = new HttpHeaders({});
    return this.http.put(`/admin/scheda`, JSON.stringify(scheda), { headers: headers });
  }

  deleteScheda(id_scheda: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', `/admin/scheda`, { body: { headers: headers, id_scheda: id_scheda } });
  }
}
