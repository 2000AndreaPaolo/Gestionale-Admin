import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

import { SchedaService } from '../services/scheda.service';
import { AtletiService } from '../services/atleti.service';
import { Schede, Atleti } from '../model';
import { Scheda } from '../model_body';
@Component({
  selector: 'app-scheda',
  templateUrl: './scheda.component.html',
  styleUrls: ['./scheda.component.css']
})
export class SchedaComponent implements OnInit {

  schede: Scheda[];
  scheda: Scheda;
  atleti: Atleti[];
  page: number = 1;
  id_scheda: number;

  constructor(private schedaService:SchedaService, private atletiService:AtletiService, private modalService: NgbModal, private toastr: ToastrService){}

  ngOnInit(){
    this.scheda = new Scheda();
    this.schedaService.getSchede().subscribe((data:Schede[]) => {
      this.schede = data;
    });
    this.schedaService.loadSchede();
    this.atletiService.getAtleti().subscribe((data:Atleti[]) => {
      this.atleti = data;
    });
    this.atletiService.loadAtleti();
  }

  openPopUp(id_scheda:number, conten:any){
    this.id_scheda = id_scheda;
    if(this.id_scheda != 0){
      this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
    }else{
      this.modalService.open(conten, {ariaLabelledBy: 'modal-basic-titile'});
    }
  }

  addScheda(){

  }

  modifyScheda(){

  }

  deleteScheda(){

  }

}
