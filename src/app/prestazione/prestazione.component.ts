import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { PrestazioneService } from '../services/prestazione.service';
import { AtletiService } from '../services/atleti.service';
import { EserciziService } from '../services/esercizzi.service';
import { Pesi, Atleti, Esercizzi, Prestazioni } from '../model';
import { Peso, Prestazione } from '../model_body';
@Component({
  selector: 'app-prestazione',
  templateUrl: './prestazione.component.html',
  styleUrls: ['./prestazione.component.css']
})
export class PrestazioneComponent implements OnInit {

  prestazioni: Prestazioni[];
  prestazione: Prestazione;
  atleti: Atleti[];
  esercizzi: Esercizzi[];
  id_atleta: number;
  id_prestazione: number;
  id_esercizio: number;
  peso: number;
  note: string;

  constructor(
    private prestazioneService: PrestazioneService,
    private atletiService: AtletiService,
    private eserciziService: EserciziService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ){}

  ngOnInit() {
    this.prestazione = new Prestazione();
    this.prestazioneService.getPrestazione().subscribe((data: Prestazioni[]) => {
      this.prestazioni = data;
    });
    this.prestazioneService.loadPrestazione();
    this.atletiService.getAtleti().subscribe((data: Atleti[]) => {
      this.atleti = data;
    });
    this.atletiService.loadAtleti();
    this.eserciziService.getEsercizzi().subscribe((data: Esercizzi[]) => {
      this.esercizzi = data;
    });
    this.eserciziService.loadEsercizzi();
  }

  openPopUp(id_prestazione: number, conten: any) {
		this.id_prestazione = id_prestazione;
		if (this.id_prestazione != 0) {
			for(let prestazione of this.prestazioni){
				if(prestazione.id_prestazione == this.id_prestazione){
					this.id_atleta = prestazione.id_atleta;
          this.note = prestazione.note;
          this.peso = prestazione.peso;
          this.id_esercizio = prestazione.id_esercizio;
				}
			}
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		} else {
      this.id_atleta = null;
      this.note = null;
      this.peso = null;
      this.id_esercizio = null;
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		}
  }

  addPrestazione() {
    this.prestazione.id_atleta = this.id_atleta;
    this.prestazione.note = this.note;
    this.prestazione.peso = this.peso;
    this.prestazione.id_esercizio = this.id_esercizio;
		this.prestazioneService.addPrestazione(this.prestazione).subscribe((data) => {
			if(data['code'] == 200){
          this.prestazioneService.loadPrestazione();
          this.modalService.dismissAll('Reason');
          this.toastr.success('Prestazione aggiunta con successo', 'Successo');
			  }else{
          this.prestazioneService.loadPrestazione();
          this.modalService.dismissAll('Reason');
          this.toastr.error('Prestazione non aggiunta', 'Errore');
			  }
		});
  }

  modifyPrestazione(){
    this.prestazione.id_prestazione = this.id_prestazione;
    this.prestazione.id_atleta = this.id_atleta;
    this.prestazione.note = this.note;
    this.prestazione.peso = this.peso;
    this.prestazione.id_esercizio = this.id_esercizio;
		this.prestazioneService.modifyPrestazione(this.prestazione).subscribe((data) => {
			if(data['code'] == 200){
          this.prestazioneService.loadPrestazione();
          this.modalService.dismissAll('Reason');
          this.toastr.success('Prestazione modificata con successo', 'Successo');
			  }else{
          this.prestazioneService.loadPrestazione();
          this.modalService.dismissAll('Reason');
          this.toastr.error('Prestazione non modificata', 'Errore');
			  }
		});
  }
  
  deletePrestazione(id_prestazione:number){
    this.prestazioneService.deletPrestazione(id_prestazione).subscribe((data) => {
			if(data['code'] == 200){
        this.prestazioneService.loadPrestazione();
				this.modalService.dismissAll('Reason');
				this.toastr.success('Prestazione eliminata con successo', 'Successo');
			}else{
        this.prestazioneService.loadPrestazione();
				this.modalService.dismissAll('Reason');
				this.toastr.error('Prestazione non eliminata', 'Errore');
			}
		});
  }
  
  onChangeIdAtleta(id_atleta:any){
		this.id_atleta = id_atleta;
  }
  
  onChangeId_esercizio(id_esercizio:any){
		this.id_esercizio = id_esercizio;
	}
}
