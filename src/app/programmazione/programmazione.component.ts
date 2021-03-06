import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ProgrammazioneService } from '../services/programmazione.service';
import { EserciziService } from '../services/esercizzi.service';
import { Programmazione } from '../model_body';
import { Programmazioni, Esercizzi, AuthUser } from '../model';
import { getLocaleDateFormat, formatDate } from '@angular/common';
@Component({
  selector: 'app-programmazione',
  templateUrl: './programmazione.component.html',
  styleUrls: ['./programmazione.component.css']
})
export class ProgrammazioneComponent implements OnInit {

  authUser:AuthUser;
  programmazioni: Programmazioni[];
  programmazione: Programmazione;
  esercizzi: Esercizzi[];
  id_esercizio: number;
  id_programma: number;
  id_programmazione: number;
  page: number = 1;
  serie: number;
  ripetizioni: number;
  carico:number;
  note: string;
  data: Date;
  filtro_data: Date;

  constructor(
    private route: ActivatedRoute, 
    private programmazioneService: ProgrammazioneService, 
    private modalService: NgbModal, 
    private toastr: ToastrService,
    private eserciziService: EserciziService,
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.route.params.subscribe(params => {
      this.id_programma = params['id_programma'];
    });
    this.programmazione = new Programmazione();
    this.programmazioneService.getProgrammazioni().subscribe((data:Programmazioni[]) => {
      this.programmazioni=data;
    });
    this.programmazioneService.loadProgrammazioni(this.id_programma, this.filtro_data);
    this.eserciziService.getEsercizzi().subscribe((data:Esercizzi[]) => {
      this.esercizzi = data;
    });
    this.eserciziService.loadEsercizzi(this.authUser.id_coach);
  }

  addProgrammazione(){
    this.programmazione.data = this.data;
    this.programmazione.id_programma = this.id_programma;
    this.programmazione.id_esercizio = this.id_esercizio;
    this.programmazione.serie = this.serie;
    this.programmazione.ripetizioni = this. ripetizioni;
    this.programmazione.carico = this.carico;
    this.programmazione.note = this.note;
    this.programmazioneService.addProgrammazione(this.programmazione).subscribe((data) => {
      if(data['code'] == 200){
        this.programmazioneService.loadProgrammazioni(this.id_programma, this.filtro_data);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Programmazione aggiunta con successo', 'Successo');
			  }else{
          this.programmazioneService.loadProgrammazioni(this.id_programma, this.filtro_data);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Programmazione non aggiunta', 'Errore');
			  }
    });
  }

  modifyProgrammazione(){
    this.programmazione.data = this.data;
    this.programmazione.id_programmazione = this.id_programmazione;
    this.programmazione.id_programma = this.id_programma;
    this.programmazione.id_esercizio = this.id_esercizio;
    this.programmazione.serie = this.serie;
    this.programmazione.ripetizioni = this.ripetizioni;
    this.programmazione.carico = this.carico;
    this.programmazione.note = this.note;
    this.programmazioneService.modifyProgrammazione(this.programmazione).subscribe((data) => {
      if(data['code'] == 200){
        this.programmazioneService.loadProgrammazioni(this.id_programma, this.filtro_data);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Programmazione modificata con successo', 'Successo');
			  }else{
          this.programmazioneService.loadProgrammazioni(this.id_programma, this.filtro_data);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Programmazione non modificata', 'Errore');
			}
    });
  }

  deleteProgrammazione(id_programmazione:number){
    this.programmazioneService.deleteProgrammazione(id_programmazione).subscribe((data) => {
      if(data['code'] == 200){
        this.programmazioneService.loadProgrammazioni(this.id_programma, this.filtro_data);
				this.modalService.dismissAll('Reason');
				this.toastr.success('programmazione eliminata con successo', 'Successo');
			  }else{
          this.programmazioneService.loadProgrammazioni(this.id_programma, this.filtro_data);
				this.modalService.dismissAll('Reason');
				this.toastr.error('programmazione non eliminata', 'Errore');
			}
    });
  }

  openPopUp(id_programmazione: number, conten: any){
    this.id_programmazione = id_programmazione;
		if (this.id_programmazione != 0) {
			this.findById_programmazione(this.id_programmazione);
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		} else {
			this.id_esercizio = null;
			this.serie = null;
			this.ripetizioni = null;
      this.note = '';
      this.carico = null;
      this.data = null;
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		}
  }

  onChangeId_esercizio(id_esercizio:any){
		this.id_esercizio = id_esercizio;
  }

  duplicateProgrammazione(id_programmazione: number){
    this.findById_programmazione(id_programmazione);
    this.addProgrammazione();
  }

  findById_programmazione(id_programmazione: number){
    for(let programmazione of this.programmazioni){
      if(programmazione.id_programmazione == id_programmazione){
        this.id_programma = programmazione.id_programma;
        this.id_esercizio = programmazione.id_esercizio;
        this.serie = programmazione.serie;
        this.ripetizioni = programmazione.ripetizioni;
        this.note = programmazione.note;
        this.carico = programmazione.carico;
        this.data = programmazione.data;
      }
    }
  }

  onChangeData(){
    let appoggio = [];
    this.programmazioni = [];
    this.programmazioneService.getProgrammazione(this.id_programma).subscribe((data: Programmazioni[]) => {
      for(let dato of data){
        if(dato.data == this.filtro_data){
          appoggio.push(dato);
        }
      }
      this.programmazioni = appoggio;
    });
  }

  resetDate(){
    this.filtro_data = undefined;
    this.programmazioneService.loadProgrammazioni(this.id_programma, this.filtro_data);
  }
}
