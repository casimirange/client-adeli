import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SessionService} from "../../services/session/session.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Sessions} from "../../Models/Sessions";
import {User} from "../../Models/users";
import {Bureau} from "../../Models/bureau";
import {BureauService} from "../../services/bureau/bureau.service";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-bureau',
  templateUrl: './bureau.component.html',
  styleUrls: ['./bureau.component.scss']
})
export class BureauComponent implements OnInit {
  headings = 'Bureau ADELI';
  subheadings = 'réorganisez le bureau pour chaque session à venir';
  icons = 'pe-7s-credit icon-gradient bg-primary';
  private roles: string[];
  public authority: string;
  term: string;
  p: number;
  sessions: Sessions[];
  users: User[];
  fonction: string[] = ['Adhérant', 'Porte Parole', 'Président', 'Secrétaire', 'Sensceur', 'Trésorier'];
  selectedBureau: Bureau;
  bureaux: Bureau[];
  bureauForm: FormGroup;
  operation: string = 'add';

  constructor(private fb: FormBuilder,
              private router: Router,
              private sessionService: SessionService,
              private tokenStorage: TokenStorageService,
              private userServices: UserService,
              private bureauService: BureauService,) {
    this.selectedBureau = new Bureau();
    this.createForm();
  }
  createForm() {
    this.bureauForm = this.fb.group({
      user: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      montant: ['', [Validators.required]],
    });
  }

  initBureau(){
    this.selectedBureau = new Bureau();
    this.createForm();
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_TRESORIER') {
          this.authority = 'tresorier';
          return false;
        } else if (role === 'ROLE_SUPER_ADMIN') {
          this.authority = 'super_admin';
          return false;
        } else if (role === 'ROLE_SECRETAIRE') {
          this.authority = 'secretaire';
          return false;
        } else if (role === 'ROLE_SENSCEUR') {
          this.authority = 'senceur';
          return false;
        } else if (role === 'ROLE_PRESIDENT') {
          this.authority = 'president';
          return false;
        } else if (role === 'ROLE_PORTE_PAROLE') {
          this.authority = 'porte parole';
          return false;
        }
        this.authority = 'membre';
        return true;
      });
    }
    this.loadSession();
    this.loadBureau();
    this.loadUsers();
  }

  loadSession() {
    this.sessionService.getAllSession().subscribe(
        data => {
          this.sessions = data
        },
        error => {
          console.log('une erreur a été détectée au chargement des sessions!')
        },
        () => {
          console.log('chargement des sessions', this.sessions);
        }
    );
  }

  loadBureau() {
    this.bureauService.getBureau().subscribe(
        data => {
          this.bureaux = data
        },
        error => {
          console.log('une erreur a été détectée au chargement des sessions!')
        },
        () => {
          console.log('chargement des bureaux', this.bureaux);
        }
    );
  }

  loadUsers() {
    this.userServices.getActiveUsers().subscribe(
        data => {
          this.users = data
        },
        error => {
          console.log('une erreur a été détectée lors du chargement des utilisateurs!')
        },
        () => {
          console.log('chargement des users', this.users);
        }
    );
  }

  addBureau() {

    const t = this.bureauForm.value;
    console.log(t);
    this.selectedBureau = t;
    // this.selectedSession.debut = this.sessForm.controls['dd'].value;
    // this.selectedSession.fin = this.sessForm.controls['df'].value;
    // this.selectedSession.fonds = this.sessForm.controls['fond'].value;
    // this.selectedSession.montant = this.sessForm.controls['cotisation'].value;
    // this.selectedSession.retenue = this.sessForm.controls['mangwa'].value;
    // this.selectedSession.taux = this.sessForm.controls['taux'].value;
    // this.selectedSession.participants = this.sessForm.controls['membres'].value;
    const Swal = require('sweetalert2');
    console.log(this.selectedBureau);
    //dès qu'on crée le département on affiche immédiatement la liste
    this.bureauService.addBureau(this.selectedBureau).subscribe(
        res => {
          this.initBureau();
          this.loadBureau();
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
            text: 'poste mis à jour',
            title: "Enregistrement réussi!"
          })
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
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          });

          Toast.fire({
            icon: 'error',
            text: error.error.message,
            title: "Echec d\'enregistrement"
          })
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
            text: 'poste mis à jour',
            title: "Enregistrement réussi!"
          })
        }
    );
  }

}
