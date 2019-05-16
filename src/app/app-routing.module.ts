import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtletiComponent } from './atleti/atleti.component';
import { EserciziComponent } from './esercizi/esercizi.component';
import { SchedaComponent } from './scheda/scheda.component';

const routes: Routes = [
  { path: 'atleti', component: AtletiComponent },
  { path: 'esercizzi', component: EserciziComponent },
  { path: 'scheda', component: SchedaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
