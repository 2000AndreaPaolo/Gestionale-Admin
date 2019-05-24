import { NgModule, Component } from '@angular/core';
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
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'atleti', component: AtletiComponent, canActivate: [AuthGuard] },
  { path: 'esercizzi', component: EserciziComponent, canActivate: [AuthGuard] },
  { path: 'scheda', component: SchedaComponent, canActivate: [AuthGuard] },
  { path: 'progressione/:id_scheda', component: ProgressioneComponent, canActivate: [AuthGuard] },
  { path: 'programma', component: ProgrammaComponent, canActivate: [AuthGuard] },
  { path: 'programmazione/:id_programma', component: ProgrammazioneComponent, canActivate: [AuthGuard] },
  { path: 'plicometria', component: PlicometriaComponent, canActivate: [AuthGuard] },
  { path: 'peso', component: PesoComponent, canActivate: [AuthGuard] },
  { path: 'prestazione', component: PrestazioneComponent, canActivate: [AuthGuard] },
  { path: 'note', component: NoteComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
