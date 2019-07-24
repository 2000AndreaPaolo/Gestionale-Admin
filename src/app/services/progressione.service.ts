import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Progressioni } from '../model';
import { Progressione } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class ProgressioneService {

  private progressioni:Subject<Progressioni[]>;

  constructor(private http: HttpClient){
    this.progressioni = new Subject<Progressioni[]>();
  }

  getProgressioni(): Observable<Progressioni[]> {
    return this.progressioni.asObservable();
  }

  loadProgressioni(id_scheda: number): void {
    let headers = new HttpHeaders({});
    this.http.post<Progressioni[]>('/admin/get/progressione', JSON.stringify(id_scheda), { headers: headers }).subscribe(res => this.progressioni.next(res));
  }

  addProgressione(progressione: Progressione){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/progressione`, JSON.stringify(progressione), { headers: headers });
  }

  modifyProgressione(progressione: Progressione){
    let headers = new HttpHeaders({});
    return this.http.put(`/admin/progressione`, JSON.stringify(progressione), { headers: headers });
  }

  deleteProgressione(id_progressione: Progressione){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', `/admin/progressione`, { body: { headers: headers, id_progressione: id_progressione } });
  }
}
