import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";

import { ProgrammaService } from '../services/programma.service';
import { AtletiService } from '../services/atleti.service';
import { Programmi, Atleti, AuthUser } from '../model';
import { Programma } from '../model_body';
@Component({
  selector: 'app-programma',
  templateUrl: './programma.component.html',
  styleUrls: ['./programma.component.css']
})
export class ProgrammaComponent implements OnInit {

  authUser:AuthUser;
  programmi: Programmi[];
  programma: Programma;
  atleti: Atleti[];

  id_atleta: number;
  id_programma: number;
  data_inizio: Date;
  data_fine:  Date;
  note: string;

  constructor(
    private programmaService: ProgrammaService, 
    private modalService: NgbModal, 
    private toastr: ToastrService,
    private atletiService: AtletiService,
    private router: Router
  ) { }

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.programma = new Programma();
    this.programmaService.getProgrammi().subscribe((data:Programmi[]) => {
      this.programmi = data;
    });
    this.programmaService.loadProgrammi(this.authUser.id_coach);
    this.atletiService.getAtleti().subscribe((data:Atleti[]) => {
      this.atleti = data;
    });
    this.atletiService.loadAtleti(this.authUser.id_coach);
  }

  addProgramma(){
    this.programma.id_atleta = this.id_atleta;
    this.programma.data_inizio = this.data_inizio;
    this.programma.data_fine = this.data_fine;
    this.programma.note = this.note;
    this.programmaService.addProgramma(this.programma).subscribe((data) => {
      if(data['code'] == 200){
        this.programmaService.loadProgrammi(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
				this.toastr.success('Programma aggiunto con successo', 'Successo');
			}else{
				this.programmaService.loadProgrammi(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Programma non aggiunto', 'Errore');
			}
    });
  }

  modifyProgramma(){
    this.programma.id_programma = this.id_programma;
    this.programma.id_atleta = this.id_atleta;
    this.programma.data_inizio = this.data_inizio;
    this.programma.data_fine = this.data_fine;
    this.programma.note = this.note;
    this.programmaService.modifyProgramma(this.programma).subscribe((data) => {
      if(data['code'] == 200){
        this.programmaService.loadProgrammi(this.authUser.id_coach);
        this.modalService.dismissAll('Reason');
				this.toastr.success('Programma modificato con successo', 'Successo');
			}else{
				this.programmaService.loadProgrammi(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Programma non modificato', 'Errore');
			}
    });
  }

  deleteProgramma(id_programma:number){
    this.programmaService.deleteProgramma(id_programma).subscribe((data) => {
      if(data['code'] == 200){
				this.programmaService.loadProgrammi(this.authUser.id_coach);
				this.toastr.success('Programma eliminato con successo', 'Successo');
			}else{
				this.programmaService.loadProgrammi(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Programma non eliminato', 'Errore');
			}
    });
  }

  openPopup(id_programma:number, conten:any){
    this.id_programma = id_programma;
    if (this.id_programma != 0) {
      for(let programma of this.programmi){
        if(programma.id_programma == this.id_programma){
          this.id_atleta = programma.id_atleta;
          this.data_inizio = programma.data_inizio;
          this.data_fine = programma.data_fine;
          this.note = programma.note;
        }
      }
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		} else {
      this.id_atleta = null;
      this.data_inizio = null;
      this.data_fine = null;
      this.note = null;
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		}
  }

  onChangeIdAtleta(id_atleta:any){
    this.id_atleta = id_atleta;
  }

  programmazione(id_programma:number){
    for(let programma of this.programmi){
			if(programma.id_programma == id_programma){
				this.router.navigate(['/programmazione', id_programma]);
			}
		}
  }
}
