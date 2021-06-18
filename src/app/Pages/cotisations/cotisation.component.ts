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
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

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
  rembForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  operation: string = 'add';
  pages: number = 7;
  id: number;

  techniciens: Technicien[];
  term: string;
  p: number;
  sessions: Sessions[];
  selectedSessions: Sessions;
  selectedTontine: Tontines;
  selectedBenef: Beneficiaires;
  tontines: any[];
  beneficiaires: Beneficiaires[];
  users: User[];
  closeResult: any;

  selectedTech: Technicien;
  private modelTech: Technicien;
  constructor(private fb: FormBuilder,
              private router: Router,
              private tontineService: TontineService,
              private sessionService: SessionService,
              private tokenStorage: TokenStorageService,
              private userServices: UserService,
              private modalService: NgbModal,
              private beneficiaireService: BeneficiaireService,
              private _location: Location,) {
    this.createForm();
    this.createForm1();
    this.createForms();
    this.pageForms();
    this.rembForms();
    this.selectedSessions = new Sessions;
    this.selectedBenef = new Beneficiaires;
  }
  createForm() {
    this.techForm = this.fb.group({
      membre: ['', [Validators.required]],
    });
  }
  rembForms() {
    this.rembForm = this.fb.group({
      mont: ['', [Validators.required]],
      membres: ['', [Validators.required]],
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


  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
        }, (reason) =>{

        }
    );
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

  addTontine() {
    const Swal = require('sweetalert2');
    // this.selectedTontine.name = this.planForm.controls['membre'].value;
    // this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.techForm.controls['membre'].value;
    console.log('membre', this.id);
    this.tontineService.newCotisation(this.id).subscribe(
        res => {
          // this.initPlan();
          this.loadActiveTontine();
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
            text: 'nouveau planning créé',
            title: 'Enregistrement réussi!'
          });
        }
    );
  }

  bouffer(){
    // console.log('remboursé ', p.nom);
    const Swal = require('sweetalert2');
    this.selectedBenef.montant = this.rembForm.controls['mont'].value;
    this.id = this.rembForm.controls['membres'].value;
    console.log('bouf', this.selectedBenef.montant)
    console.log('id', this.id)
    console.log('benef', this.selectedBenef)
    this.beneficiaireService.newBenef(this.id, this.selectedBenef).subscribe(
        res => {
          // this.initPlan();
          this.loadBeneficiaires();
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
            text: 'nouveau planning créé',
            title: 'Enregistrement réussi!'
          });
        }
    );
  }
}
