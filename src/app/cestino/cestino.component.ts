import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { CestinoService } from "../services/cestino.service";
import { Atleti, Note, Pesi } from '../model';
@Component({
  selector: 'app-cestino',
  templateUrl: './cestino.component.html',
  styleUrls: ['./cestino.component.css']
})
export class CestinoComponent implements OnInit {

  atleti: Atleti[];
  note: Note[];
  pesi: Pesi[];

  constructor(
    private cestinoService:CestinoService,
    private toastr: ToastrService
  ){}

  ngOnInit(){
    this.cestinoService.getAtleti_eliminati().subscribe((data: Atleti[]) => {
      this.atleti = data;
    });
    this.cestinoService.loadAtleti_eliminati();
  }

  restore(id_atleta: number){
    this.cestinoService.restoreAtleta(id_atleta).subscribe((data) => {
      if(data['code'] == 200){
        this.cestinoService.loadAtleti_eliminati();
        this.toastr.success('Atleta rimosso con successo', 'Successo');
      }else{
        this.cestinoService.loadAtleti_eliminati();
        this.toastr.error('Atleta non rimosso', 'Errore');
      }
    });
  }
}
