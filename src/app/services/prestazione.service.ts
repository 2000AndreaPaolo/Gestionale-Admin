import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Prestazioni } from '../model';
import { Prestazione } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class PrestazioneService {

  private prestazione:Subject<Prestazioni[]>;

  constructor(private http: HttpClient){
    this.prestazione = new Subject<Prestazioni[]>();
  }

  getPrestazione(): Observable<Prestazioni[]> {
    return this.prestazione.asObservable();
  }

  loadPrestazione(id_coach:number): void {
    let headers = new HttpHeaders({});
    this.http.post<Prestazioni[]>('/admin/get/prestazione', JSON.stringify(id_coach), { headers: headers }).subscribe(res => this.prestazione.next(res));
  }

  addPrestazione(prestazione: Prestazione){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/prestazione`, JSON.stringify(prestazione), { headers: headers });
  }

  modifyPrestazione(prestazione: Prestazione){
    let headers = new HttpHeaders({});
    return this.http.put(`/admin/prestazione`, JSON.stringify(prestazione), { headers: headers });
  }

  deletPrestazione(id_prestazione: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', `/admin/prestazione`, { body: { headers: headers, id_prestazione: id_prestazione } });
  }
}
