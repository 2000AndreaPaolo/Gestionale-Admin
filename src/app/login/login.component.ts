import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service'
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Auth } from '../model_body'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth: Auth;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService
  ){} 

  ngOnInit(){
    this.auth = new Auth();
  }

  login(){
    state: RouterStateSnapshot;
    this.authService.login(this.auth).subscribe((data: Boolean) => {
      if(data){
        this.router.navigate(['/']);
      }else{
        this.toastr.error('Credenziali non corrette', 'Errore');
      }
    });
  }
}
