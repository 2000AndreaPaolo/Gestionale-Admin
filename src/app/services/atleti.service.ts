import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Atleti } from '../model';
import { Atleta } from '../model_body';

@Injectable({
  providedIn: 'root'
})
export class AtletiService {

  private atleti:Subject<Atleti[]>;

  constructor(private http: HttpClient){
    this.atleti = new Subject<Atleti[]>();
  }

  getAtleti(): Observable<Atleti[]> {
    return this.atleti.asObservable();
  }

  loadAtleti(): void {
    this.http.get<Atleti[]>(environment.apiUrl + '/admin/atleta').subscribe(res => this.atleti.next(res));
  }

  addAtleta(atleta: Atleta){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + `/admin/atleta`, JSON.stringify(atleta), { headers: headers });
  }

  modifyAtleti(atleta: Atleta){
    let headers = new HttpHeaders({});
    return this.http.put(environment.apiUrl + `/admin/atleta`, JSON.stringify(atleta), { headers: headers });
  }

  deleteAtleta(id_atleta: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', environment.apiUrl + `/admin/atleta`, { body: { headers: headers, id_atleta: id_atleta } });
  }

  clalcoEta(data_nascita){
    let timeDiff = Math.abs(Date.now() - data_nascita);
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }
}
