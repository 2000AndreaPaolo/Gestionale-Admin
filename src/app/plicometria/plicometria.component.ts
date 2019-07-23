import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { PlicometriaService } from '../services/plicometria.service';
import { AtletiService } from '../services/atleti.service';
import { Plicometrie, Atleti, AuthUser } from '../model';
import { Plicometria } from '../model_body';
@Component({
  selector: 'app-plicometria',
  templateUrl: './plicometria.component.html',
  styleUrls: ['./plicometria.component.css']
})
export class PlicometriaComponent implements OnInit {

  authUser:AuthUser;
  plicometrie: Plicometrie[];
  plicometria: Plicometria;
  atleti: Atleti[];
  page: number = 1;
  id_plicometria: number;
  id_atleta: number;
  pettorale: number;
  addome: number;
  gamba: number;
  note: string;
  data_rilevazione: Date;

  constructor(private plicometriaService:PlicometriaService, private modalService: NgbModal, private toastr: ToastrService, private atletiService: AtletiService) { }

  ngOnInit() {
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.plicometria = new Plicometria();
    this.plicometriaService.getPlicometrie().subscribe((data:Plicometrie[]) => {
      this.plicometrie = data;
    });
    this.plicometriaService.loadPlicometrie(this.authUser.id_coach);
    this.atletiService.getAtleti().subscribe((data: Atleti[]) => {
			this.atleti = data;
		});
		this.atletiService.loadAtleti(this.authUser.id_coach);
  }

  addPlicometria(){
    this.plicometria.id_atleta = this.id_atleta;
    this.plicometria.pettorale = this.pettorale;
    this.plicometria.addome = this.addome;
    this.plicometria.gamba = this.gamba;
    this.plicometria.percentuale = this.id_atleta;
    this.plicometria.note = this.note;
    this.plicometria.data_rilevazione = this.data_rilevazione;
    this.plicometria.id_coach = this.authUser.id_coach;
    for(let atleta of this.atleti){
      if(atleta.id_atleta == this.id_atleta){
        this.plicometria.percentuale = this.calcoloPercentuale(atleta.data_nascita);
      }
    }
    console.log(this.plicometria);
    this.plicometriaService.addPlicometria(this.plicometria).subscribe((data) => {
      if(data['code'] == 200){
				this.plicometriaService.loadPlicometrie(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Plicometria aggiunta con successo', 'Successo');
			}else{
        this.plicometriaService.loadPlicometrie(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Plicometria non aggiunta', 'Errore');
			}
    });
  }

  modifyPlicometria(){
    this.plicometria.id_plicometria = this.id_plicometria;
    this.plicometria.id_atleta = this.id_atleta;
    this.plicometria.pettorale = this.pettorale;
    this.plicometria.addome = this.addome;
    this.plicometria.gamba = this.gamba;
    this.plicometria.note = this.note;
    this.plicometria.data_rilevazione = this.data_rilevazione;
    this.plicometria.id_coach = this.authUser.id_coach;
    for(let atleta of this.atleti){
      if(atleta.id_atleta == this.id_atleta){
        this.plicometria.percentuale = this.calcoloPercentuale(atleta.data_nascita);
      }
    }
    this.plicometriaService.modifyPlicometria(this.plicometria).subscribe((data) => {
      if(data['code'] == 200){
				this.plicometriaService.loadPlicometrie(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Plicometria modificata con successo', 'Successo');
			}else{
        this.plicometriaService.loadPlicometrie(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Plicometria non modificata', 'Errore');
			}
    });
  }

  deletePlicometria(id_plicometria:number){
    this.plicometriaService.deletePlicometria(id_plicometria).subscribe((data) => {
      if(data['code'] == 200){
				this.plicometriaService.loadPlicometrie(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.success('Plicometria rimossa con successo', 'Successo');
			}else{
        this.plicometriaService.loadPlicometrie(this.authUser.id_coach);
				this.modalService.dismissAll('Reason');
				this.toastr.error('Plicometria non rimossa', 'Errore');
			}
    });
  }

  openPopUp(id_plicometria:number, content:any){
    this.id_plicometria = id_plicometria;
    if(id_plicometria != 0){
      for(let plicometria of this.plicometrie){
        if(plicometria.id_plicometria == this.id_plicometria){
          this.pettorale = plicometria.pettorale;
          this.addome = plicometria.addome;
          this.gamba = plicometria.gamba;
          this.note = plicometria.note;
          this.id_atleta = plicometria.id_atleta;
          this.data_rilevazione = plicometria.data_rilevazione
        }
      }
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
    }else{
      this.id_atleta = null;
      this.pettorale = null;
      this.addome = null;
      this.gamba = null;
      this.note = null;
      this.data_rilevazione = null;
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-titile'});
    }
  }

  onChangeIdAtleta(id_atleta:any){
		this.id_atleta = id_atleta;
  }
  
  calcoloPercentuale(data: any){
    let somma_pliche = this.pettorale + this.addome + this.gamba;
    let eta = this.atletiService.clalcoEta(new Date(data));
    let densita = 1.1093800 - 0.0008267*(somma_pliche) + 0.0000016*(somma_pliche*somma_pliche) - 0.0002574*eta;
    return 495 / densita - 450;
  }
}
