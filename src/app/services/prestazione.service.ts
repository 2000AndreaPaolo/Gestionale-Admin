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

  loadPrestazione(): void {
    this.http.get<Prestazioni[]>(environment.apiUrl + '/admin/prestazione').subscribe(res => this.prestazione.next(res));
  }

  addPrestazione(prestazione: Prestazione){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + `/admin/prestazione`, JSON.stringify(prestazione), { headers: headers });
  }

  modifyPrestazione(prestazione: Prestazione){
    let headers = new HttpHeaders({});
    return this.http.put(environment.apiUrl + `/admin/prestazione`, JSON.stringify(prestazione), { headers: headers });
  }

  deletPrestazione(id_prestazione: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', environment.apiUrl + `/admin/prestazione`, { body: { headers: headers, id_prestazione: id_prestazione } });
  }
}
