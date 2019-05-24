import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthenticationService} from '../services/authentication.service';
import { AuthUser } from '../model';
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  userString:string = "";
  authUser:AuthUser;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ){}

  ngOnInit(){
    this.authUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.userString += this.authUser.nome;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
