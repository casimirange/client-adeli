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
import Swal from "sweetalert2";
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
  loade: boolean = false;
  loader: boolean = false;
  sessions: Sessions[];
  selectedSessions: Sessions;
  selectedTontine: Tontines;
  selectedBenef: Beneficiaires;
  tontines: any[] = [];
  beneficiaires: Beneficiaires[] = [];
  users: User[];
  closeResult: any;
  sessionId = '';
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
      date: ['', [Validators.required]],
    });
  }
  rembForms() {
    this.rembForm = this.fb.group({
      mont: ['', [Validators.required, Validators.pattern("^[0-9]{1,13}$") ]],
      membres: ['', [Validators.required]],
      date: ['', [Validators.required]],
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
          // console.log('une erreur a été détectée au chargement des sessions!')
        },
        () => {
          // console.log('chargement des sessions', this.sessions);
        }
    );
  }
  // //
  loadActiveTontine() {
    this.loade = true;
    // console.log(this.sessionId)
    this.tontineService.getHistoriqueActiveSession(this.sessionId).subscribe(
        data => {
          this.tontines = data

        },
        error => {
          // console.log('une erreur tontine active');
          this.loade = false;
        },
        () => {
          // console.log('chargement tontine active', this.tontines);
          this.loade = false;
        }
    );
  }

  loadBeneficiaires() {
    this.loader = true;
    this.beneficiaireService.getBeneficiaireSession(this.sessionId).subscribe(
        data => {
          this.beneficiaires = data;
        },
        error => {
          // console.log('une erreur chargement des bénéficiaires!')
          this.loader = false;
        },
        () => {
          // console.log('chargement des bénéficiaires', this.beneficiaires);
          this.loader = false;
        }
    );
  }

  loadUsers() {
    this.userServices.getActiveUsers().subscribe(
        data => {
          this.users = data

        },
        error => {
          // console.log('une erreur a été détectée lors du chargement des utilisateurs!')
        },
        () => {
          // console.log('chargement des utilisateurs', this.users);
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
    // const Swal = require('sweetalert2');
    // this.selectedTontine.name = this.planForm.controls['membre'].value;
    // this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.techForm.controls['membre'].value;
    // console.log('membre', this.id);
    this.tontineService.newCotisation(this.id, this.techForm.controls['date'].value).subscribe(
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
    // // console.log('remboursé ', p.nom);
    // const Swal = require('sweetalert2');
    this.selectedBenef.montant = this.rembForm.controls['mont'].value;
    this.selectedBenef.date = this.rembForm.controls['date'].value;
    this.id = this.rembForm.controls['membres'].value;
    // console.log('bouf', this.selectedBenef.montant)
    // console.log('id', this.id)
    // console.log('benef', this.selectedBenef)
    this.beneficiaireService.newBenef(this.id, this.selectedBenef, this.selectedBenef.date).subscribe(
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
