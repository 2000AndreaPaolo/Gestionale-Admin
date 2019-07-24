import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import '../model';
import '../model_body';
import { Note } from '../model';
import { Nota } from '../model_body';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private note:Subject<Note[]>;

  constructor(private http: HttpClient){
    this.note = new Subject<Note[]>();
  }

  getNote(): Observable<Note[]> {
    return this.note.asObservable();
  }

  loadNote(id_coach:number): void {
    let headers = new HttpHeaders({});
    this.http.post<Note[]>('/admin/get/note', JSON.stringify(id_coach), { headers: headers }).subscribe(res => this.note.next(res));
  }

  addNote(note: Nota){
    let headers = new HttpHeaders({});
    return this.http.post(`/admin/note`, JSON.stringify(note), { headers: headers });
  }

  modifyNote(note: Nota){
    let headers = new HttpHeaders({});
    return this.http.put(`/admin/note`, JSON.stringify(note), { headers: headers });
  }

  deletNote(id_note: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', `/admin/note`, { body: { headers: headers, id_note: id_note } });
  }
}
