import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { EserciziService } from '../services/esercizzi.service';
import { Esercizzi } from '../model';
import { Esercizio } from '../model_body';
import { AuthUser } from '../model';
@Component({
  selector: 'app-esercizi',
  templateUrl: './esercizi.component.html',
  styleUrls: ['./esercizi.component.css']
})
export class EserciziComponent implements OnInit {

  authUser:AuthUser;
  esercizzi:Esercizzi[];
  esercizio:Esercizio;
  id_esercizio:number;
  descrizione:string;
  page:number = 1;
  filtro_input:string;

  constructor(
    private eserciziService:EserciziService, 
    private modalService: NgbModal, 
    private toastr: ToastrService
    ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.esercizio = new Esercizio();
    this.eserciziService.getEsercizzi().subscribe((data:Esercizzi[]) => {
      this.esercizzi = data;
    });
    this.eserciziService.loadEsercizzi(this.authUser.id_coach);
  }

  openPopUp(id_esercizio:number, conten:any){
    this.id_esercizio = id_esercizio;
    if(id_esercizio != 0){
      for(let esercizio of this.esercizzi){
        if(esercizio.id_esercizio == this.id_esercizio){
          this.descrizione = esercizio.descrizione;
          this.esercizio.descrizione = this.descrizione;
          this.esercizio.id_esercizio = this.id_esercizio;
        }
      }
      this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
    }else{
      this.descrizione = '';
      this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
    }
  }

  addEsercizio(){
    this.esercizio.descrizione = this.descrizione;
    this.esercizio.id_coach = this.authUser.id_coach;
    this.eserciziService.addEsercizio(this.esercizio).subscribe((data) => {
      if(data['code'] == 200){
        this.eserciziService.loadEsercizzi(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.success('Esercizio aggiunto con successo', 'Successo');
      }else{
        this.eserciziService.loadEsercizzi(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.error('Esercizio non aggiunto', 'Errore');
      }
    });
  }

  modifyEsercizio(){
    this.esercizio.descrizione = this.descrizione;
    this.esercizio.id_esercizio = this.id_esercizio;
    this.eserciziService.modifysercizio(this.esercizio).subscribe((data) => {
      if(data['code'] == 200){
        this.eserciziService.loadEsercizzi(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.success('Esercizio modificato con successo', 'Successo');
      }else{
        this.eserciziService.loadEsercizzi(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.error('Esercizio non modificato', 'Errore');
      }
    });
  }

  deleteEsercizio(id_esercizio:number){
    this.eserciziService.deletesercizio(id_esercizio).subscribe((data) => {
      if(data['code'] == 200){
        this.eserciziService.loadEsercizzi(this.authUser.id_coach);
        this.toastr.success('Esercizio eliminato con successo', 'Successo');
      }else{
        this.eserciziService.loadEsercizzi(this.authUser.id_coach);
        this.toastr.error('Esercizio non eliminato', 'Errore');
      }
    });
  }

  filter(){
    let appoggio = [];
    this.esercizzi = [];
    this.eserciziService.getEsercizi(this.authUser.id_coach).subscribe((data: Esercizzi[]) => {
      for(let dato of data){
        if(dato.descrizione.includes(this.filtro_input)){
          appoggio.push(dato);
        }
      }
      this.esercizzi = appoggio;
    });
  }
}
