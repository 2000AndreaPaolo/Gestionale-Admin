import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { EserciziService } from '../services/esercizzi.service';
import { Esercizzi } from '../model';
import { Esercizio } from '../model_body';
import { GruppiMuscolari } from '../model';
@Component({
  selector: 'app-esercizi',
  templateUrl: './esercizi.component.html',
  styleUrls: ['./esercizi.component.css']
})
export class EserciziComponent implements OnInit {

  esercizzi:Esercizzi[];
  esercizio:Esercizio;
  gruppiMuscolari:GruppiMuscolari[];
  id_gruppoMuscolare: number;
  id_esercizio:number;
  descrizione:string;
  page:number = 1;

  constructor(private eserciziService:EserciziService, private modalService: NgbModal, private toastr: ToastrService){}

  ngOnInit(){
    this.esercizio = new Esercizio();
    this.eserciziService.getEsercizzi().subscribe((data:Esercizzi[]) => {
      this.esercizzi = data;
    });
    this.eserciziService.loadEsercizzi();
    this.eserciziService.getGruppoMuscolare().subscribe((data:GruppiMuscolari[]) => {
      this.gruppiMuscolari = data;
    });
    this.eserciziService.loadGruppoMuscolare();
  }

  openPopUp(id_esercizio:number, conten:any){
    this.id_esercizio = id_esercizio;
    if(id_esercizio != 0){
      for(let esercizio of this.esercizzi){
        if(esercizio.id_esercizio == this.id_esercizio){
          this.descrizione = esercizio.descrizione;
          this.esercizio.descrizione = this.descrizione;
          this.esercizio.id_esercizio = this.id_esercizio;
          this.id_gruppoMuscolare = esercizio.id_gruppoMuscolare;
        }
      }
      this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
    }else{
      this.descrizione = '';
      this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
    }
  }

  onChangeGruppoMuscolare(id_gruppoMuscolare:any){
    this.id_gruppoMuscolare = id_gruppoMuscolare;
  }

  addEsercizio(){
    this.esercizio.descrizione = this.descrizione;
    this.esercizio.id_gruppoMuscolare = this.id_gruppoMuscolare;
    this.eserciziService.addEsercizio(this.esercizio).subscribe((data) => {
      if(data['code'] == 200){
        this.eserciziService.loadEsercizzi();
        this.modalService.dismissAll('Reason');
        this.toastr.success('Esercizio aggiunto con successo', 'Successo');
      }else{
        this.eserciziService.loadEsercizzi();
        this.modalService.dismissAll('Reason');
        this.toastr.error('Esercizio non aggiunto', 'Errore');
      }
    });
  }

  modifyEsercizio(){
    this.esercizio.descrizione = this.descrizione;
    this.esercizio.id_esercizio = this.id_esercizio;
    this.esercizio.id_gruppoMuscolare = this.id_gruppoMuscolare;
    this.eserciziService.modifysercizio(this.esercizio).subscribe((data) => {
      if(data['code'] == 200){
        this.eserciziService.loadEsercizzi();
        this.modalService.dismissAll('Reason');
        this.toastr.success('Esercizio modificato con successo', 'Successo');
      }else{
        this.eserciziService.loadEsercizzi();
        this.modalService.dismissAll('Reason');
        this.toastr.error('Esercizio non modificato', 'Errore');
      }
    });
  }

  deleteEsercizio(id_esercizio:number){
    this.eserciziService.deletesercizio(id_esercizio).subscribe((data) => {
      if(data['code'] == 200){
        this.eserciziService.loadEsercizzi();
        this.toastr.success('Esercizio eliminato con successo', 'Successo');
      }else{
        this.eserciziService.loadEsercizzi();
        this.toastr.error('Esercizio non eliminato', 'Errore');
      }
    });
  }
}
