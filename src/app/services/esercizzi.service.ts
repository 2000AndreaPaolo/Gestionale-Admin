import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Esercizzi } from '../model';
import { Esercizio } from '../model_body';
import { GruppiMuscolari } from '../model';
@Injectable({
  providedIn: 'root'
})
export class EserciziService {

  private esercizzi:Subject<Esercizzi[]>;
  private gruppiMuscolari:Subject<GruppiMuscolari[]>;

  constructor(private http: HttpClient){
    this.esercizzi = new Subject<Esercizzi[]>();
    this.gruppiMuscolari = new Subject<GruppiMuscolari[]>();
  }

  getEsercizzi(): Observable<Esercizzi[]> {
    return this.esercizzi.asObservable();
  }

  loadEsercizzi(id_coach: number): void {
    let headers = new HttpHeaders({});
    this.http.post<Esercizzi[]>('/admin/get/esercizio', JSON.stringify(id_coach), { headers: headers }).subscribe(res => this.esercizzi.next(res));
  }

  addEsercizio(esercizio: Esercizio){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/esercizio`, JSON.stringify(esercizio), { headers: headers });
  }

  modifysercizio(esercizio: Esercizio){
    let headers = new HttpHeaders({});
    return this.http.put(`/admin/esercizio`, JSON.stringify(esercizio), { headers: headers });
  }

  deletesercizio(id_esercizio: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', `/admin/esercizio`, { body: { headers: headers, id_esercizio: id_esercizio } });
  }

  getGruppoMuscolare(): Observable<GruppiMuscolari[]> {
    return this.gruppiMuscolari.asObservable();
  }

  loadGruppoMuscolare(): void {
    this.http.get<GruppiMuscolari[]>('/admin/gruppomuscolare').subscribe(res => this.gruppiMuscolari.next(res));
  }
}
