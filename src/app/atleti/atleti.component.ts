import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { AtletiService } from '../services/atleti.service';
import { PlicometriaService } from '../services/plicometria.service';
import { Atleti, Plicometrie, Specializzazioni, AuthUser } from '../model';
import { Atleta } from '../model_body';
@Component({
  selector: 'app-atleti',
  templateUrl: './atleti.component.html',
  styleUrls: ['./atleti.component.css']
})
export class AtletiComponent implements OnInit {

  authUser:AuthUser;
  atleti:Atleti[];
  specializzazioni:Specializzazioni[];
  atleta:Atleta;
  plicometrie:Plicometrie[];
  id_atleta:number = null;
  id_specializzazione:number = null;

  pagePliche: number = 1;
  pageSchede: number = 1;

  nome:string  = '';
  cognome:string = '';
  data_nascita:Date;

  constructor(
    private atletiService:AtletiService, 
    private modalService: NgbModal, 
    private toastr: ToastrService, 
    private plicometriaService:PlicometriaService
    ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.atleta = new Atleta();
    this.atletiService.getAtleti().subscribe((data:Atleti[]) => {
      this.atleti = data;
    });
    this.atletiService.loadAtleti(this.authUser.id_coach);

    this.plicometriaService.getPlicometrie().subscribe((data:Plicometrie[]) => {
      this.plicometrie = data;
    });
    this.plicometriaService.loadPlicometrie(this.authUser.id_coach); 
    
    this.atletiService.getSpceializzazione().subscribe((data:Specializzazioni[]) => {
      this.specializzazioni = data;
    });
    this.atletiService.loadSpecializzazioni();
  }

  openPopUp(id_atleta:number, conten:any){
    this.id_atleta = id_atleta;
    if(id_atleta != 0){
      for(let atleta of this.atleti){
        if(atleta.id_atleta == this.id_atleta){
          this.nome = atleta.nome;
          this.cognome = atleta.cognome;
          this.data_nascita = atleta.data_nascita;
          this.id_specializzazione = atleta.id_specializzazione;
          this.atleta.id_coach = this.authUser.id_coach;
        }
      }
      this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
    }else{
      this.nome = '';
      this.cognome = '';
      this.data_nascita = null;
      this.id_specializzazione = null;
      this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
    }
  }

  addAtleta(){
    this.atleta.nome = this.nome;
    this.atleta.cognome = this.cognome;
    this.id_atleta = this.id_atleta;
    this.atleta.data_nascita = this.data_nascita;
    this.atleta.id_specializzazione = this.id_specializzazione;
    this.atleta.id_coach = this.authUser.id_coach;
    this.atletiService.addAtleta(this.atleta).subscribe((data) => {
      if(data['code'] == 200){
        this.atletiService.loadAtleti(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.success('Atleta aggiunto con successo', 'Successo');
      }else if (data['code'] == undefined){
        this.atletiService.loadAtleti(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.success('Atleta aggiunto con successo', 'Successo');
      }else{
        this.atletiService.loadAtleti(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.error('Atleta non aggiunto', 'Errore');
      }
    });
  }

  modifyAtleta(){
    this.atleta.nome = this.nome;
    this.atleta.cognome = this.cognome;
    this.atleta.id_atleta = this.id_atleta;
    this.atleta.data_nascita = this.data_nascita;
    this.atleta.id_specializzazione = this.id_specializzazione;
    this.atleta.id_coach = this.authUser.id_coach;
    this.atletiService.modifyAtleti(this.atleta).subscribe((data) => {
      if(data['code'] == 200){
        this.atletiService.loadAtleti(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.success('Atleta modificato con successo', 'Successo');
      }else{
        this.atletiService.loadAtleti(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
        this.toastr.error('Atleta non modificato', 'Errore');
      }
    });
  }

  deleteAtelta(id_atleta:number){
    this.atletiService.deleteAtleta(id_atleta).subscribe((data) => {
      if(data['code'] == 200){
        this.atletiService.loadAtleti(this.authUser.id_coach);
        this.toastr.success('Atleta eliminato con successo', 'Successo');
      }else{
        this.atletiService.loadAtleti(this.authUser.id_coach);
        this.toastr.error('Atleta non eliminato', 'Errore');
      }
    });
  }

  view(id_atleta:number, conten){
    let appoggio_pliche:Plicometrie[] = [];
    for(let plicometria of this.plicometrie){
      if(plicometria.id_atleta == id_atleta){
        appoggio_pliche.push(plicometria);
      }
    }
    this.plicometrie = appoggio_pliche;
    this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
  }

  onChangeSpecializzazione(id_specializzazione:any){
    this.id_specializzazione = id_specializzazione;
  }

  resetPassword(id_atleta:number){
    this.atletiService.resetPassword(id_atleta).subscribe((data:any)=>{ 
      if(data.code == 200)
      this.toastr.success('Password Resettata', 'Successo');
      
      else
      this.toastr.error('Password non resettata', 'Errore');
    });
  }
}
