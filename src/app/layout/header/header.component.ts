import { Component, OnInit } from '@angular/core';
// import {AuthService} from "../../services/auth/auth.service";
// import {Router} from "@angular/router";
// import {Principal} from "../../Models/principal";
// import {Store} from "@ngrx/store";
// import {PrincipalState} from "../../Models/principal.state";
// import {UserService} from "../../services/users/users.service";
// import {User} from "../../Models/users";
import {TokenStorageService} from "../../auth/token-storage.service";
import {MachinesService} from "../../services/machines/machines.service";
import {Machine} from "../../Models/machines";
import {Router} from "@angular/router";
import {NotificationsService} from "../../services/notifications/notifications.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // private principal: Principal;
  //
  // hasRole: boolean;
  // nom: string;
  // prenom: string;
  // selectedUser: User;
  info: any;
  notifications: any[];
  private roles: string[];
  public authority: string;
  public name: string = '';
  constructor(private token: TokenStorageService,
              private notificationService: NotificationsService,
              private router: Router ) {
    // this.selectedUser = new User();
  }
  // constructor(private authService: AuthService, private router: Router, private store: Store<PrincipalState>,
  //             private userService: UserService) {
  //   // this.selectedUser = new User();
  // }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    if (this.token.getToken()) {
      this.roles = this.token.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_TRESORIER') {
          this.authority = 'tresorier';
          this.name = 'tresorier';
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          this.name = 'Super Admin';
          return false;
        } else if (role === 'ROLE_SECRETAIRE') {
          this.authority = 'secretaire';
          this.name = 'secretaire';
          return false;
        } else if (role === 'ROLE_SENSCEUR') {
          this.authority = 'senceur';
          this.name = 'senceur';
          return false;
        } else if (role === 'ROLE_PRESIDENT') {
          this.authority = 'president';
          this.name = 'president';
          return false;
        } else if (role === 'ROLE_PORTE_PAROLE') {
          this.authority = 'porte parole';
          this.name = 'porte parole';
          return false;
        }
        this.authority = 'membre';
        this.name = 'user';
        return true;
      });
    }

    this.loadNotifs();
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  loadNotifs(){
    this.notificationService.getNotifs().subscribe(
        data => {
          this.notifications = data;

        }
    );
  }
}
