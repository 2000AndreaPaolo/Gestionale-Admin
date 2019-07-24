import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { ProgressioneService } from '../services/progressione.service';
import { EserciziService } from '../services/esercizzi.service';
import { Progressioni, Esercizzi, AuthUser } from '../model';
import { Progressione, Esercizio } from '../model_body';
@Component({
  selector: 'app-progressione',
  templateUrl: './progressione.component.html',
  styleUrls: ['./progressione.component.css']
})
export class ProgressioneComponent implements OnInit {

  authUser:AuthUser;
  progressione: Progressione;
  progressioni: Progressioni[];
  esercizio: Esercizio;
  esercizzi: Esercizzi[];
  id_scheda: number;
  id_progressione: number;
  page: number = 1;
  id_esercizio: number;
  giorno: number;
  serie: number;
  ripetizioni: number;
  note: string;

  constructor(
    private route: ActivatedRoute, 
    private progressioneService: ProgressioneService, 
    private modalService: NgbModal, 
    private toastr: ToastrService,
    private eserciziService: EserciziService
  ) { }

  ngOnInit() {
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.route.params.subscribe(params => {
      this.id_scheda = params['id_scheda'];
    });
    this.progressione = new Progressione();
    this.progressioneService.getProgressioni().subscribe((data: Progressioni[]) => {
      this.progressioni = data;
		});
    this.progressioneService.loadProgressioni(this.id_scheda);
    this.esercizio = new Esercizio();
    this.eserciziService.getEsercizzi().subscribe((data: Esercizzi[]) => {
      this.esercizzi = data;
    });
    this.eserciziService.loadEsercizzi(this.authUser.id_coach);
  }

  addProgressione(){
    this.progressione.id_scheda = this.id_scheda;
    this.progressione.giorno = this.giorno;
    this.progressione.id_esercizio = this.id_esercizio;
    this.progressione.serie = this.serie;
    this.progressione.ripetizioni = this. ripetizioni;
    this.progressione.note = this.note;
    this.progressioneService.addProgressione(this.progressione).subscribe((data) => {
      if(data['code'] == 200){
				this.progressioneService.loadProgressioni(this.id_scheda);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Progressione aggiunta con successo', 'Successo');
			  }else{
				this.progressioneService.loadProgressioni(this.id_scheda);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Progressione non aggiunta', 'Errore');
			  }
    });
  }

  modifyProgressione(){
    this.progressione.id_progressione = this.id_progressione;
    this.progressione.id_scheda = this.id_scheda;
    this.progressione.giorno = this.giorno;
    this.progressione.id_esercizio = this.id_esercizio;
    this.progressione.serie = this.serie;
    this.progressione.ripetizioni = this. ripetizioni;
    this.progressione.note = this.note;
    this.progressioneService.modifyProgressione(this.progressione).subscribe((data) => {
      if(data['code'] == 200){
				this.progressioneService.loadProgressioni(this.id_scheda);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Progressione modificata con successo', 'Successo');
			  }else{
				this.progressioneService.loadProgressioni(this.id_scheda);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Progressione non modificata', 'Errore');
			}
    });
  }

  deleteProgressione(id_progressione){
    this.progressioneService.deleteProgressione(id_progressione).subscribe((data) => {
      if(data['code'] == 200){
				this.progressioneService.loadProgressioni(this.id_scheda);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Progressione eliminata con successo', 'Successo');
			  }else{
				this.progressioneService.loadProgressioni(this.id_scheda);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Progressione non eliminata', 'Errore');
			}
    });
  }

  openPopUp(id_progressione: number, conten: any) {
		this.id_progressione = id_progressione;
		if (this.id_progressione != 0) {
			for(let progressione of this.progressioni){
				if(progressione.id_progressione == this.id_progressione){
          this.id_scheda = progressione.id_scheda;
          this.giorno = progressione.giorno;
          this.id_esercizio = progressione.id_esercizio;
          this.serie = progressione.serie;
          this.ripetizioni = progressione. ripetizioni;
          this.note = progressione.note;
				}
			}
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		} else {
			this.giorno = null;
			this.id_esercizio = null;
			this.serie = null;
			this.ripetizioni = null;
			this.note = '';
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		}
	}

  onChangeId_esercizio(id_esercizio:any){
		this.id_esercizio = id_esercizio;
	}

}
