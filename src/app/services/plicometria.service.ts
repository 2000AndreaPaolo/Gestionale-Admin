import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Plicometrie } from '../model';
import { Plicometria } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class PlicometriaService {

  private plicometrie:Subject<Plicometrie[]>;

  constructor(private http: HttpClient){
    this.plicometrie = new Subject<Plicometrie[]>();
  }

  getPlicometrie(): Observable<Plicometrie[]> {
    return this.plicometrie.asObservable();
  }

  loadPlicometrie(): void {
    this.http.get<Plicometrie[]>(environment.apiUrl + '/admin/plicometria').subscribe(res => this.plicometrie.next(res));
  }

  addPlicometria(plicometria: Plicometria){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + `/admin/plicometria`, JSON.stringify(plicometria), { headers: headers });
  }

  modifyPlicometria(plicometria: Plicometria){
    let headers = new HttpHeaders({});
    return this.http.put(environment.apiUrl + `/admin/plicometria`, JSON.stringify(plicometria), { headers: headers });
  }

  deletePlicometria(id_plicometria: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', environment.apiUrl + `/admin/plicometria`, { body: { headers: headers, id_plicometria: id_plicometria } });
  }
}
