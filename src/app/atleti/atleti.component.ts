import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'angular-highcharts';


import { AtletiService } from '../services/atleti.service';
import { PlicometriaService } from '../services/plicometria.service';
import { PesoService } from '../services/peso.service';
import { NoteService } from '../services/note.service';
import { PrestazioneService } from '../services/prestazione.service';
import { Atleti, Specializzazioni, Prestazioni, AuthUser } from '../model';
import { Atleta, Plicometria, Nota, Peso } from '../model_body';
@Component({
  selector: 'app-atleti',
  templateUrl: './atleti.component.html',
  styleUrls: ['./atleti.component.css']
})
export class AtletiComponent implements OnInit {

  authUser:AuthUser;
  atleti:Atleti[];
  specializzazioni:Specializzazioni[];
  prestazioni: Prestazioni[];
  atleta:Atleta;
  id_atleta:number = null;
  id_specializzazione:number = null;

  plicometria:Plicometria;
  nota:Nota;
  peso:Peso;

  pageSchede: number = 1;

  nome:string  = '';
  cognome:string = '';
  data_nascita:Date;

  chart_squat:Chart;
  chart_panca:Chart;
  chart_stacco:Chart;
  nome_atleta: string = '';

  constructor(
    private atletiService:AtletiService, 
    private modalService: NgbModal, 
    private toastr: ToastrService, 
    private plicometriaService: PlicometriaService,
    private noteService: NoteService,
    private pesoService: PesoService,
    private prestazioneService: PrestazioneService
    ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.atleta = new Atleta();
    this.atletiService.getAtleti().subscribe((data:Atleti[]) => {
      this.atleti = data;
    });
    this.atletiService.loadAtleti(this.authUser.id_coach);
    
    this.atletiService.getSpceializzazione().subscribe((data:Specializzazioni[]) => {
      this.specializzazioni = data;
    });
    this.atletiService.loadSpecializzazioni();

    this.prestazioneService.loadPrestazione(this.authUser.id_coach);
    this.prestazioneService.getPrestazione().subscribe((data: Prestazioni[]) => {
      this.prestazioni = data;
    });
    this.prestazioneService.loadPrestazione(this.authUser.id_coach);

    this.plicometria = new Plicometria();
    this.nota = new Nota();
    this.peso = new Peso();
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
    this.noteService.lastNote(id_atleta).subscribe((data: Nota) => {
      if(data[0] != null){
        this.nota = data[0];
      }else{
        this.nota.note = '';
        this.nota.data = null;
      }
      this.plicometriaService.lastPlicometria(id_atleta).subscribe((data: Plicometria) => {
        if(data[0] != null){
          this.plicometria = data[0];
        }else{
          this.plicometria.pettorale = null;
          this.plicometria.addome = null;
          this.plicometria.gamba = null;
          this.plicometria.data_rilevazione = null;
          this.plicometria.percentuale = null;
        }
        this.pesoService.lastPeso(id_atleta).subscribe((data: Peso) => {
          if(data[0] != null){
            this.peso = data[0];
          }else{
            this.peso.peso = null;
            this.peso.note = '';
            this.peso.data = null;
          }
          this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
        });
      });
    });
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

  printProgressioni(id_atleta:any, content:any){
    let vet_panca = [];
    let vet_squat = [];
    let vet_stacco = [];
    for(let prestazione of this.prestazioni){
      if(prestazione.id_atleta == id_atleta){
        if(prestazione.id_esercizio == 1){
          vet_squat.push(prestazione);
        }
        if(prestazione.id_esercizio == 2){
          vet_panca.push(prestazione);
        }
        if(prestazione.id_esercizio == 3){
          vet_stacco.push(prestazione);
        }
      }
    }
    let chart_squat = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Squat'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Squat',
        data: [],
        type: undefined,
      }]
    });
    for(let squat of vet_squat){
      chart_squat.addPoint(squat.peso);
    }
    this.chart_squat = chart_squat;
    let chart_panca = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Panca'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Panca',
        data: [],
        type: undefined,
      }]
    });
    for(let panca of vet_panca){
      chart_panca.addPoint(panca.peso);
    }
    this.chart_panca = chart_panca;
    let chart_stacco = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Stacco da terra'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Stacco da terra',
        data: [],
        type: undefined,
      }]
    });
    for(let stacco of vet_stacco){
      chart_stacco.addPoint(stacco.peso);
    }
    this.chart_stacco = chart_stacco;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
  }
}
