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
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
              private modalService: NgbModal,
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
          this.bureaux = data;
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
    const Swal = require('sweetalert2');
    console.log(this.selectedBureau);
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

  updateBureau() {

    const t = this.bureauForm.value;
    console.log(t);
    this.selectedBureau = t;
    const Swal = require('sweetalert2');
    console.log(this.selectedBureau);
    this.bureauService.updateBureau(this.selectedBureau.id_election).subscribe(
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
            title: "Modification réussie!"
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
            title: "Echec de modification"
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
            title: "Modification réussie!"
          })
        }
    );
  }

  swl(pan: Bureau){
    const Swal = require('sweetalert2');
    var content = document.createElement('div');
    content.innerHTML = 'Voulez-vous vraiment supprimer <strong>' + pan.user.toString() + '</strong> ?';
    Swal.fire({
      title: 'Suppression',
      html: content,
      icon: 'warning',
      footer: '<a >Cette action est irréversible</a>',

      showCancelButton: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: true,
      focusConfirm: false,
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.bureauService.deletePannes(pan.id_election).subscribe(
            res => {
              console.log('panne supprimée')
              this.modalService.dismissAll();
              this.loadBureau();
            }
        );
        Swal.fire({
          title: 'Suppression !',
          text: "membre supprimé avec succès!",
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });


      }
    })
  }

}
