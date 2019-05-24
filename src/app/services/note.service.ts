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

  loadNote(): void {
    this.http.get<Note[]>(environment.apiUrl + '/admin/note').subscribe(res => this.note.next(res));
  }

  addNote(note: Note){
    let headers = new HttpHeaders({});
    return this.http.post(environment.apiUrl + `/admin/note`, JSON.stringify(note), { headers: headers });
  }

  modifyNote(note: Note){
    let headers = new HttpHeaders({});
    return this.http.put(environment.apiUrl + `/admin/note`, JSON.stringify(note), { headers: headers });
  }

  deletNote(id_note: number){
    let headers  = new HttpHeaders({});
    return this.http.request('delete', environment.apiUrl + `/admin/note`, { body: { headers: headers, id_note: id_note } });
  }
}
