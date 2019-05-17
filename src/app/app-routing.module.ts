import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtletiComponent } from './atleti/atleti.component';
import { EserciziComponent } from './esercizi/esercizi.component';
import { SchedaComponent } from './scheda/scheda.component';
import { ProgressioneComponent } from './progressione/progressione.component';

const routes: Routes = [
  { path: 'atleti', component: AtletiComponent },
  { path: 'esercizzi', component: EserciziComponent },
  { path: 'scheda', component: SchedaComponent },
  { path: 'progressione/:id_scheda', component: ProgressioneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
