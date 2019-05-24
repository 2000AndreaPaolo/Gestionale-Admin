import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { API_URL } from './_shared/injectionTokens';
import { environment } from '../environments/environment';
import { ApiUrlInterceptor } from './_helpers/api-url.interceptor';

import { AtletiComponent } from './atleti/atleti.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { EserciziComponent } from './esercizi/esercizi.component';
import { SchedaComponent } from './scheda/scheda.component';
import { ProgressioneComponent } from './progressione/progressione.component';
import { PlicometriaComponent } from './plicometria/plicometria.component';
import { ProgrammaComponent } from './programma/programma.component';
import { ProgrammazioneComponent } from './programmazione/programmazione.component';
import { PesoComponent } from './peso/peso.component';
import { NoteComponent } from './note/note.component';
import { PrestazioneComponent } from './prestazione/prestazione.component';
import { LoginComponent } from './login/login.component';

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
    ProgrammazioneComponent,
    PesoComponent,
    NoteComponent,
    PrestazioneComponent,
    LoginComponent
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
  providers: [
    { provide: API_URL, useValue: environment.apiUrl },
    { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true, deps: [API_URL] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
