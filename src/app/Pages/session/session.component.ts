import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../auth/token-storage.service";
import {SessionService} from "../../services/session/session.service";
import {Sessions} from "../../Models/Sessions";
import {Location} from "@angular/common";

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {

  headings = 'Session';
  subheadings = 'Gérez les sessions d\'ADELI';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  sessions: Sessions[];
  activeSessions: Sessions;
  loaders: boolean = false;
  selectedSession: Sessions;
  sessForm: FormGroup;
  operation: string = 'add';
  searchForms: FormGroup;
  private roles: string[];
  public authority: string;
  dd: Date;
  df: Date;

  constructor(private fb: FormBuilder,
              private sessionServices: SessionService,
              private tokenStorage: TokenStorageService,
              private _location: Location,
  ) {
    this.selectedSession = new Sessions();
    this.activeSessions = new Sessions();
    this.createForm()
  }

  createForm() {
    this.sessForm = this.fb.group({
      dd: ['', [Validators.required]],
      df: ['', [Validators.required]],
      taux: ['', [Validators.required]],
      mangwa: ['', [Validators.required]],
      fond: ['', [Validators.required]],
      cotisation: ['', [Validators.required]],
      membres: ['', [Validators.required]],
    });
  }

  initSession(){
    this.selectedSession = new Sessions();
    this.activeSessions = new Sessions();
    this.createForm();
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      const Swal = require('sweetalert2');
      var content = document.createElement('div');
      this.roles.every(role => {
        if (role === 'ROLE_TRESORIER') {
          this.authority = 'tresorier';
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          return false;
        } else if (role === 'ROLE_SECRETAIRE') {
          this.authority = 'secretaire';
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_SENSCEUR') {
          this.authority = 'senceur';
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_PRESIDENT') {
          this.authority = 'president';
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        } else if (role === 'ROLE_PORTE_PAROLE') {
          this.authority = 'porte parole';
          content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
          return false;
        }
        this.authority = 'membre';
        content.innerHTML = 'Vous n\'êtes pas autorisé à accéder à cette page';
          Swal.fire({
            title: 'Aucun Accès!',
            html: content,
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
            allowOutsideClick: false,
            focusConfirm: true,
          }).then((result) => {
            this._location.back();
          })
        return true;
      });
    }
    this.allSession();
    this.activeSession();
  }

  allSession() {
    this.sessions = [];
    this.sessionServices.getAllSession().subscribe(
        data => {
          this.sessions = data;
        } ,
        error => {
          console.log('les sessions ne se sont pas chargées correctement')
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          console.log("Liste des sessions: ", this.sessions)
        }
    );
  }

  activeSession() {

    this.sessionServices.getActiveSession().subscribe(
        data => {
          this.activeSessions = data;
        } ,
        error => {
          console.log('les sessions ne se sont pas chargées correctement');
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          console.log('session active: ', this.activeSessions);
        }
    );
  }



  addSession() {

    const t = this.sessForm.value;
    console.log(t);
    // this.selectedSession = t;
    this.selectedSession.debut = this.sessForm.controls["dd"].value;
    this.selectedSession.fin = this.sessForm.controls['df'].value;
    this.selectedSession.fonds = this.sessForm.controls['fond'].value;
    this.selectedSession.montant = this.sessForm.controls['cotisation'].value;
    this.selectedSession.retenue = this.sessForm.controls['mangwa'].value;
    this.selectedSession.taux = this.sessForm.controls['taux'].value;
    this.selectedSession.participants = this.sessForm.controls['membres'].value;
    const Swal = require('sweetalert2');
    console.log(this.selectedSession);
    this.sessionServices.newSession(this.selectedSession).subscribe(
        res => {
          this.initSession();
          this.allSession();

        },
        error => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            background: '#f7d3dc',
            timer: 5000,
            timerProgressBar: true,
            onOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });

          Toast.fire({
            icon: 'error',
            text: error.error.message,
            title: 'Echec d\'enregistrement',
          });
        },
        () => {
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
            text: 'nouvelle session créée',
            title: 'Enregistrement réussi!'
          });
        }
    );


  }

  activeTechnicien(){
    this.sessionServices.desableSession(this.selectedSession.id_session).subscribe(
        res => {

        }
    );
  }

  swl(tec: Sessions){
    const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Clôture de Session',
      html: "Voulez-vous fermer la session de "+ tec.debut+" ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00ace6',
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: true,
      focusConfirm: false,
      focusCancel: false,
      focusDeny: true,
      footerTemplate: 'Attention! cette action est irréversible',
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.activeTechnicien();
        this.initSession()
        this.allSession();
        this.activeSession();
        Swal.fire({
          // title: tec.etat == false ? 'Activation' : 'Désactivation',
          html: 'Session clôturée avec succès!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        })
      }
    })
  }

}
