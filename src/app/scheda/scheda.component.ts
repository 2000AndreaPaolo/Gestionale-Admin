import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { ProgressioneService } from '../services/progressione.service';
import { EserciziService } from '../services/esercizzi.service';
import { SchedaService } from '../services/scheda.service';
import { AtletiService } from '../services/atleti.service';
import { Progressioni, Esercizzi, Schede, Atleti, AuthUser } from '../model';
import { Scheda } from '../model_body';
@Component({
	selector: 'app-scheda',
	templateUrl: './scheda.component.html',
	styleUrls: ['./scheda.component.css']
})
export class SchedaComponent implements OnInit {

	authUser:AuthUser;
	schede: Schede[];
	scheda: Scheda;
	atleti: Atleti[];
	esercizzi: Esercizzi[];
	progressioni: Progressioni[];
	page: number = 1;
	id_scheda: number;
	nome: string;
	data_inizio: Date;
	data_fine: Date;
	durata: number;
	id_atleta: number;

	constructor(
		private schedaService: SchedaService, 
		private atletiService: AtletiService, 
		private modalService: NgbModal, 
		private toastr: ToastrService, 
		private router: Router,
		private progressioneService: ProgressioneService,
		private eserciziService: EserciziService
	){}

	ngOnInit() {
		this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
		this.scheda = new Scheda();
		this.schedaService.getSchede().subscribe((data: Schede[]) => {
			this.schede = data;
		});
		this.schedaService.loadSchede(this.authUser.id_coach);
		this.atletiService.getAtleti().subscribe((data: Atleti[]) => {
			this.atleti = data;
		});
		this.atletiService.loadAtleti(this.authUser.id_coach);
	}

	openPopUp(id_scheda: number, conten: any) {
		this.id_scheda = id_scheda;
		if (this.id_scheda != 0) {
			for(let scheda of this.schede){
				if(scheda.id_scheda == this.id_scheda){
					this.nome = scheda.nome;
					this.data_inizio = scheda.data_inizio;
					this.data_fine = scheda.data_fine;
					this.durata = scheda.durata;
					this.id_atleta = scheda.id_atleta;
				}
			}
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		} else {
			this.nome = '';
			this.data_inizio = null;
			this.data_fine = null;
			this.durata = null;
			this.id_atleta = null;
			this.modalService.open(conten, { ariaLabelledBy: 'modal-basic-titile' });
		}
	}

	addScheda() {
		this.scheda.nome = this.nome;
		this.scheda.data_inizio = this.data_inizio;
		this.scheda.data_fine = this.data_fine;
		this.scheda.durata = this.durata;
		this.scheda.id_atleta = this.id_atleta;
		this.scheda.id_coach = this.authUser.id_coach;
		this.schedaService.addScheda(this.scheda).subscribe((data) => {
			if(data['code'] == 200){
				this.schedaService.loadSchede(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Scheda aggiunta con successo', 'Successo');
			  }else{
				this.schedaService.loadSchede(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Scheda non aggiunta', 'Errore');
			  }
		});
	}

	modifyScheda() {
		this.scheda.id_scheda = this.id_scheda;
		this.scheda.nome = this.nome;
		this.scheda.data_inizio = this.data_inizio;
		this.scheda.data_fine = this.data_fine;
		this.scheda.durata = this.durata;
		this.scheda.id_atleta = this.id_atleta;
		this.scheda.id_coach = this.authUser.id_coach;
		this.schedaService.modifyScheda(this.scheda).subscribe((data) => {
			if(data['code'] == 200){
				this.schedaService.loadSchede(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Scheda modificata con successo', 'Successo');
			  }else{
				this.schedaService.loadSchede(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Scheda non modificata', 'Errore');
			  }
		});
	}

	deleteScheda(id_scheda:number) {
		this.schedaService.deleteScheda(id_scheda).subscribe((data) => {
			if(data['code'] == 200){
				this.schedaService.loadSchede(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Scheda eliminata con successo', 'Successo');
			  }else{
				this.schedaService.loadSchede(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Scheda non eliminata', 'Errore');
			  }
		});
	}

	onChangeIdAtleta(id_atleta:any){
		this.id_atleta = id_atleta;
	}

	progressione(id_scheda:number){
		for(let scheda of this.schede){
			if(scheda.id_scheda == id_scheda){
				this.router.navigate(['/progressione', id_scheda]);
			}
		}
	}

	onChangeId_atleta(id_atleta: number){
		if(id_atleta == -1){
			this.schedaService.loadSchede(this.authUser.id_coach);
		}else{
			this.schede = [];
			this.schedaService.getScheda(id_atleta).subscribe((data: Schede[]) => {
				this.schede = data;
			});
		}
		
	}

	print(id_scheda: number){
		this.progressioneService.getProgressioni().subscribe((data: Progressioni[]) => {
			this.progressioni = data;
			this.eserciziService.getEsercizzi().subscribe((data: Esercizzi[]) => {
				this.esercizzi = data;
				pdfMake.createPdf(this.print_option()).open({}, window);
			});
	  	});
	  	this.progressioneService.loadProgressioni(id_scheda);
		this.eserciziService.loadEsercizzi(this.authUser.id_coach);
	}
	print_option(){
		return {
			content: [
				{
					table: {
    					widths: ['*','*','*','*','*'],
						body: [
							[
								{
									text: 'Giorno'
								},
								{
									text: 'Esercizio'
								},
								{
									text: 'Serie'
								},
								{
									text: 'Ripetizioni'
								},
								{
									text: 'Note'
								}
							],
							...this.progressioni.map(progressione => {
							  return [
								  progressione.giorno,
								  progressione.nome_esercizio,
								  progressione.serie,
								  progressione.ripetizioni,
								  progressione.note
							  ];
							})
						]
					}
				}
			]
		};
	}
}
