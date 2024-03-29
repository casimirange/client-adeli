import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './logins.component.html',
  styleUrls: ['./logins.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  loginForm: FormGroup;

  credentials = {
    username: '',
    password: ''
  };

  // private roles: string[];
  private authority: string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private fb: FormBuilder,private router: Router,) { }

  ngOnInit() {
    let token = localStorage.getItem('authToken');
    if(token){
      this.router.navigateByUrl('/dashboard');
      // console.log('authtoken')
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.minLength(3), Validators.required ]],
      password: ['', [Validators.minLength(6), Validators.required ]],
    });

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
  }

  onSubmits() {
    console.log(this.form);
    console.log(this.loginForm);

    this.loginInfo = new AuthLoginInfo(
        this.loginForm.controls['username'].value,
        this.loginForm.controls['password'].value,
      // this.form.username,
      // this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.reloadPage();
        // const Swal = require('sweetalert2');
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 5000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          title: data.username,
          text: 'connecté !'
        })
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
        // const Swal = require('sweetalert2');
        const Toast = Swal.mixin({
          toast: true,
          position: 'bottom-end',
          showConfirmButton: false,
          background: '#f7d3dc',
          timer: 10000,
          timerProgressBar: true,
          onOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'error',
          text: error.error.message,
          title: "Echec de connexion"
        })
      }
    );
  }

  reloadPage() {
    this.router.navigateByUrl('/dashboard')
    // window.location.reload();
    // if (this.tokenStorage.getToken()) {
    //   this.roles = this.tokenStorage.getAuthorities();
    //   this.roles.every(role => {
    //     if (role === 'ROLE_ADMIN') {
    //       this.authority = 'admin';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //     } else if (role === 'ROLE_SUPER_ADMIN') {
    //       this.authority = 'super_admin';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //     } else if (role === 'ROLE_USER_MINDOUROU') {
    //       this.authority = 'user_mind';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //     } else if (role === 'ROLE_RESP_PLACAGE') {
    //       this.authority = 'resp_pla';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //     } else if (role === 'ROLE_RESP_SCIERIE') {
    //       this.authority = 'resp_sci';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //     } else if (role === 'ROLE_RESP_BRAZIL') {
    //       this.authority = 'resp_bra';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //     } else if (role === 'ROLE_RESP_CP') {
    //       this.authority = 'resp_cp';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //     } else if (role === 'ROLE_RESP_MAINTENANCE') {
    //       this.authority = 'resp_maint';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //     } else if (role === 'ROLE_RESP_MINDOUROU') {
    //       this.authority = 'resp_mind';
    //       this.router.navigateByUrl('/dashboard')
    //       return false;
    //
    //     }
    //     this.authority = 'user_alpi';
    //       this.router.navigateByUrl('/new-panne')
    //     return true;
    //   });
    // }
  }
}
