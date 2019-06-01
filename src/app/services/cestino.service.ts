import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { Atleti } from '../model';
@Injectable({
  providedIn: 'root'
})
export class CestinoService {

  private atleti:Subject<Atleti[]>;

  constructor(private http: HttpClient){
    this.atleti = new Subject<Atleti[]>();
  }

  getAtleti_eliminati(): Observable<Atleti[]> {
    return this.atleti.asObservable();
  }

  loadAtleti_eliminati(): void {
    this.http.get<Atleti[]>('/admin/deleted/atleti').subscribe(res => this.atleti.next(res));
  }

  restoreAtleta(id_atleta: number){
    let headers = new HttpHeaders({});
    return this.http.post("/admin/deleted/atleti/restore", JSON.stringify(id_atleta), { headers: headers });
  }
}
