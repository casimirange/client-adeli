import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Location} from "@angular/common";
import {Technicien} from "../../Models/techniciens";
import {TechniciensService} from "../../services/techniciens/techniciens.service";
import {TontineService} from "../../services/tontine/tontine.service";
import {SessionService} from "../../services/session/session.service";
import {Sessions} from "../../Models/Sessions";
import {Tontines} from "../../Models/tontines";
import {Beneficiaires} from "../../Models/beneficiaires";
import {BeneficiaireService} from "../../services/beneficiaire/beneficiaire.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../Models/users";

@Component({
  selector: 'app-cotisation',
  templateUrl: './cotisation.component.html',
  styleUrls: ['./cotisation.component.scss']
})
export class CotisationComponent implements OnInit {
  headings = 'Cotisations';
  subheadings = 'Gestion des cotisations de chaque membre';
  icons = 'pe-7s-credit icon-gradient bg-primary';

  private roles: string[];
  public authority: string;

  techForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  operation: string = 'add';
  pages: number = 7;

  techniciens: Technicien[];
  term: string;
  p: number;
  sessions: Sessions[];
  selectedSessions: Sessions;
  selectedTontine: Tontines;
  tontines: any[];
  beneficiaires: Beneficiaires[];
  users: User[];

  selectedTech: Technicien;
  private modelTech: Technicien;
  constructor(private fb: FormBuilder,
              private router: Router,
              private tontineService: TontineService,
              private sessionService: SessionService,
              private tokenStorage: TokenStorageService,
              private userServices: UserService,
              private beneficiaireService: BeneficiaireService,
              private _location: Location,) {
    this.createForm();
    this.createForm1();
    this.createForms();
    this.pageForms();
    this.selectedSessions = new Sessions;
  }
  createForm() {
    this.techForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      matricule: ['', [Validators.required]]
    });
  }

  createForm1() {
    this.searchPanForm = this.fb.group({
      search: [''],
    });
  }

  createForms() {
    this.selectPanForm = this.fb.group({
      periode: ['']
    });
  }

  pageForms() {
    this.pageForm = this.fb.group({
      page: ['']
    });
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
    this.loadActiveTontine();
    this.loadBeneficiaires();
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
  // //
  loadActiveTontine() {
    this.tontineService.getHistoriqueActiveSession().subscribe(
        data => {
          this.tontines = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
        }
    );
  }

  loadBeneficiaires() {
    this.beneficiaireService.getBeneficiaireSession().subscribe(
        data => {
          this.beneficiaires = data

        },
        error => {
          console.log('une erreur a été détectée!')
        },
        () => {
          console.log('chargement des techniciens actifs');
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
          console.log('chargement des techniciens actifs');
        }
    );
  }
  // //
  // // loadDesactiveTechniciens() {
  // //   this.techService.getDesactiveTechniciens().subscribe(
  // //       data => {
  // //         this.techniciens = data
  // //
  // //       },
  // //       error => {
  // //         console.log('une erreur a été détectée!')
  // //       },
  // //       () => {
  // //         console.log('chargement des techniciens actifs');
  // //       }
  // //   );
  // // }
  // //
  // // addTechnicien() {
  // //   const t = this.techForm.value;
  // //   console.log(t);
  // //   this.selectedTech = t;
  // //   this.selectedTech.localisation = 'bonaberi';
  // //
  // //   //dès qu'on crée le département on affiche immédiatement la liste
  // //   this.techService.addTech(this.selectedTech).subscribe(
  // //       res => {
  // //         this.initTech();
  // //         this.loadTechniciens();
  // //       }
  // //   );
  // //
  // // }
  // //
  // // updateTechnicien() {
  // //   // console.log('tech: '+ this.selectedTech)
  // //   this.modelTech.nom = this.techForm.controls['nom'].value;
  // //   this.modelTech.prenom = this.techForm.controls['prenom'].value;
  // //   this.modelTech.fonction= this.techForm.controls['fonction'].value;
  // //   this.modelTech.matricule= this.techForm.controls['matricule'].value;
  // //   this.modelTech.etat = this.selectedTech.etat;
  // //   this.modelTech.idTechnicien = this.selectedTech.idTechnicien;
  // //
  // //   console.log('nom : '+ this.modelTech.nom )
  // //   console.log('prenom : '+ this.modelTech.prenom )
  // //   console.log('fonction: '+ this.modelTech.fonction)
  // //   console.log('matricule: '+ this.modelTech.matricule)
  // //   console.log('etat : '+ this.modelTech.etat )
  // //   console.log('idTechnicien : '+ this.modelTech.idTechnicien )
  // //   this.techService.updateTech(this.modelTech).subscribe(
  // //       res => {
  // //         this.initTech();
  // //         this.loadTechniciens();
  // //       }
  // //   );
  // // }
  // //
  // // initTech() {
  // //   this.selectedTech = new Technicien();
  // //   this.createForm();
  // // }
  // //
  // // deleteTechnicien() {
  // //   this.techService.deleteTech(this.selectedTech.idTechnicien).subscribe(
  // //       res => {
  // //         this.selectedTech = new Technicien();
  // //         this.loadTechniciens();
  // //         this.loadActiveTechniciens();
  // //         this.loadDesactiveTechniciens();
  // //       }
  // //   );
  // // }
  // //
  // // activeTechnicien(){
  // //   this.techService.activeTech(this.selectedTech.matricule).subscribe(
  // //       res => {
  // //         this.initTech();
  // //         // this.loadActiveTechniciens();
  // //         // this.loadDesactiveTechniciens();
  // //         this.loadTechniciens();
  // //       }
  // //   );
  // // }
  // //
  // // swl(tec: Technicien){
  // //   const Swal = require('sweetalert2');
  // //   Swal.fire({
  // //     title: tec.etat == false ? 'Activation' : 'Désactivation',
  // //     html: tec.etat == false ? "Voulez-vous activer "+ tec.nom.toUpperCase().bold(): "Voulez-vous désactiver " + tec.nom.toUpperCase().bold()+" ?",
  // //     icon: tec.etat == false ? 'question' : 'warning',
  // //     showCancelButton: true,
  // //
  // //     confirmButtonColor: '#00ace6',
  // //     cancelButtonColor: '#f65656',
  // //     confirmButtonText: 'OUI',
  // //     cancelButtonText: 'Annuler',
  // //     allowOutsideClick: true,
  // //     focusConfirm: false,
  // //     focusCancel: false,
  // //     focusDeny: true,
  // //     showLoaderOnConfirm: true
  // //   }).then((result) => {
  // //     if (result.value) {
  // //       this.activeTechnicien();
  // //       Swal.fire({
  // //         // title: tec.etat == false ? 'Activation' : 'Désactivation',
  // //         html:  tec.etat == false ? 'Utilisateur ' + tec.nom.toUpperCase().bold() +' Activé avec succès!' : 'Utilisateur ' + tec.nom.toUpperCase().bold() +' Désactivé avec succès!',
  // //         icon: 'success',
  // //         timer: 2000,
  // //         showConfirmButton: false
  // //       })
  // //     }
  // //   })
  // // }
  //
  // findSso($event){
  //   if (this.selectPanForm.controls['periode'].value == 'tous'){
  //     this.loadTechniciens();
  //   }
  //   if (this.selectPanForm.controls['periode'].value == 'actifs'){
  //     this.loadActiveTechniciens();
  //   }
  //   if (this.selectPanForm.controls['periode'].value == 'inactifs'){
  //     this.loadDesactiveTechniciens();
  //   }
  // }

  paginate($event){
    if (this.pageForm.controls['page'].value == '10'){
      this.pages = 10;
    }
    if (this.pageForm.controls['page'].value == '25'){
      this.pages = 25;
    }
    if (this.pageForm.controls['page'].value == '50'){
      this.pages = 50;
    }
    if (this.pageForm.controls['page'].value == '100'){
      this.pages = 100;
    }
    if (this.pageForm.controls['page'].value == '1000'){
      this.pages = 1000;
    }
  }
}
