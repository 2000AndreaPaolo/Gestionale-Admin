import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CestinoService } from "../services/cestino.service";
import { Atleti, Note, Pesi, AuthUser } from '../model';
@Component({
  selector: 'app-cestino',
  templateUrl: './cestino.component.html',
  styleUrls: ['./cestino.component.css']
})
export class CestinoComponent implements OnInit {

  authUser:AuthUser;
  atleti: Atleti[];
  note: Note[];
  pesi: Pesi[];

  constructor(
    private cestinoService:CestinoService,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.cestinoService.getAtleti_eliminati().subscribe((data: Atleti[]) => {
      this.atleti = data;
    });
    this.cestinoService.loadAtleti_eliminati(this.authUser.id_coach);
  }

  restore(id_atleta: number){
    this.cestinoService.restoreAtleta(id_atleta).subscribe((data) => {
      if(data['code'] == 200){
        this.cestinoService.loadAtleti_eliminati(this.authUser.id_coach);
        this.toastr.success('Atleta rimosso con successo', 'Successo');
      }else{
        this.cestinoService.loadAtleti_eliminati(this.authUser.id_coach);
        this.toastr.error('Atleta non rimosso', 'Errore');
      }
    });
  }
}
