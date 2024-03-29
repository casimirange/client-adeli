import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
// import {PrincipalState} from "../../Models/principal.state";
// import {Principal} from "../../Models/principal";
import {TokenStorageService} from "../../auth/token-storage.service";
import {DepartementsService} from "../../services/departements/departements.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  private roles: string[];
  public authority: string;

  constructor(private tokenStorage: TokenStorageService,
              private departementService: DepartementsService,private router: Router ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
    this.roles = this.tokenStorage.getAuthorities();
    // const Swal = require('sweetalert2');
    this.roles.every(role => {
      if (role === 'ROLE_TRESORIER') {
        this.authority = 'tresorier';
        return false;
      }
      else if (role === 'ROLE_SUPER_ADMIN') {
        this.authority = 'super_admin';
        return false;
      }
      else if (role === 'ROLE_SECRETAIRE') {
        this.authority = 'secretaire';
        return false;
      }
      else if (role === 'ROLE_SENSCEUR') {
        this.authority = 'senceur';
        return false;
      }
      else if (role === 'ROLE_PRESIDENT') {
        this.authority = 'president';
        return false;
      }
      else if (role === 'ROLE_COMISSAIRE_AU_COMPTE') {
        this.authority = 'comissaire';
        return false;
      }
      else if (role === 'ROLE_PORTE_PAROLE') {
        this.authority = 'porte parole';
        return false;
      }
      this.authority = 'membre';
      return true;
    });
  }
  }

}
