import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-progressione',
  templateUrl: './progressione.component.html',
  styleUrls: ['./progressione.component.css']
})
export class ProgressioneComponent implements OnInit {

  id_scheda: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id_scheda = params['id_scheda'];
    });
  }

}
