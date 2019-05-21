import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { AtletiComponent } from './atleti/atleti.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { EserciziComponent } from './esercizi/esercizi.component';
import { SchedaComponent } from './scheda/scheda.component';
import { ProgressioneComponent } from './progressione/progressione.component';
import { PlicometriaComponent } from './plicometria/plicometria.component';
import { ProgrammaComponent } from './programma/programma.component';
import { ProgrammazioneComponent } from './programmazione/programmazione.component';

@NgModule({
  declarations: [
    AppComponent,
    AtletiComponent,
    MainNavComponent,
    EserciziComponent,
    SchedaComponent,
    ProgressioneComponent,
    PlicometriaComponent,
    ProgrammaComponent,
    ProgrammazioneComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
