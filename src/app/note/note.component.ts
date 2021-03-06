import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { NoteService } from '../services/note.service';
import { AtletiService } from '../services/atleti.service';
import { Note, Atleti, AuthUser } from '../model';
import { Nota } from '../model_body';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  authUser:AuthUser;
  note: Note[];
  nota: Nota;
  atleti: Atleti[];
  id_atleta: number;
  id_note: number;
  note_: string;
  page:number;
  filtro_data: Date;

  constructor(
    private noteService: NoteService,
    private atletiService: AtletiService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.nota = new Nota();
    this.noteService.getNote().subscribe((data: Note[]) => {
      this.note = data;
    });
    this.noteService.loadNote(this.authUser.id_coach);
    this.atletiService.getAtleti().subscribe((data: Atleti[]) => {
      this.atleti = data;
    });
    this.atletiService.loadAtleti(this.authUser.id_coach);
  }

  openPopUp(id_note: number, conten: any) {
		this.id_note = id_note;
		if (this.id_note != 0) {
			for(let nota of this.note){
				if(nota.id_note == this.id_note){
					this.id_atleta = nota.id_atleta;
					this.note_ = nota.note;
				}
			}
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		} else {
      this.id_atleta = null;
      this.note_ = null;
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		}
  }
  
  addNote() {
    this.nota.id_atleta = this.id_atleta;
    this.nota.note = this.note_;
		this.noteService.addNote(this.nota).subscribe((data) => {
			if(data['code'] == 200){
          this.noteService.loadNote(this.authUser.id_coach);
          this.modalService.dismissAll('Reason');
          this.toastr.success('Nota aggiunta con successo', 'Successo');
			  }else{
          this.noteService.loadNote(this.authUser.id_coach);
          this.modalService.dismissAll('Reason');
          this.toastr.error('Nota non aggiunta', 'Errore');
			  }
		});
  }

  modifyNote(){
    this.nota.id_note = this.id_note;
    this.nota.id_atleta = this.id_atleta;
    this.nota.note = this.note_;
		this.noteService.modifyNote(this.nota).subscribe((data) => {
			if(data['code'] == 200){
          this.noteService.loadNote(this.authUser.id_coach);
          this.modalService.dismissAll('Reason');
          this.toastr.success('Nota modificata con successo', 'Successo');
			  }else{
          this.noteService.loadNote(this.authUser.id_coach);
          this.modalService.dismissAll('Reason');
          this.toastr.error('Nota non modificata', 'Errore');
			  }
		});
  }

  deleteNote(id_note:number){
    this.noteService.deletNote(id_note).subscribe((data) => {
			if(data['code'] == 200){
				this.noteService.loadNote(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Nota eliminata con successo', 'Successo');
			  }else{
          this.noteService.loadNote(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Nota non eliminata', 'Errore');
			  }
		});
  }
  
  onChangeIdAtleta(id_atleta:any){
		this.id_atleta = id_atleta;
  }
  
  onChangeData(){
    let appoggio = [];
    this.note = [];
    this.noteService.getNota(this.authUser.id_coach).subscribe((data: Note[]) => {
      for(let dato of data){
        if(dato.data == this.filtro_data){
          appoggio.push(dato);
        }
      }
      this.note = appoggio;
    });
  }

  onChangeIdAtletaFilter(id_atleta:any){
    this.note = [];
    this.noteService.getNota(this.authUser.id_coach).subscribe((data: Note[]) => {
      if(id_atleta == ''){
        return this.note = data;
      }else{
        let appoggio = [];
        for(let dato of data){
          if(dato.id_atleta == id_atleta){
            appoggio.push(dato);
          }
        }
        return this.note = appoggio;
      }
    });
  }
}
