import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtletiComponent } from './atleti/atleti.component';
import { EserciziComponent } from './esercizi/esercizi.component';
import { SchedaComponent } from './scheda/scheda.component';
import { ProgressioneComponent } from './progressione/progressione.component';
import { PlicometriaComponent } from './plicometria/plicometria.component';
import { ProgrammaComponent } from './programma/programma.component';
import { ProgrammazioneComponent } from './programmazione/programmazione.component';
import { PesoComponent } from './peso/peso.component';
import { NoteComponent } from './note/note.component';
import { PrestazioneComponent } from './prestazione/prestazione.component';

const routes: Routes = [
  { path: 'atleti', component: AtletiComponent },
  { path: 'esercizzi', component: EserciziComponent },
  { path: 'scheda', component: SchedaComponent },
  { path: 'progressione/:id_scheda', component: ProgressioneComponent },
  { path: 'programma', component: ProgrammaComponent },
  { path: 'programmazione/:id_programma', component: ProgrammazioneComponent },
  { path: 'plicometria', component: PlicometriaComponent },
  { path: 'peso', component: PesoComponent },
  { path: 'prestazione', component: PrestazioneComponent },
  { path: 'note', component: NoteComponent },
  { path: '', redirectTo: '/atleti', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
