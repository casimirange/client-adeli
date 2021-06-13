import { Component, OnInit } from '@angular/core';
import {Prêts} from "../../Models/prets";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PretService} from "../../services/pret/pret.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Location} from "@angular/common";
import {User} from "../../Models/users";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-prets',
  templateUrl: './prets.component.html',
  styleUrls: ['./prets.component.scss']
})
export class PretsComponent implements OnInit {

  headings = 'Amandes';
  subheadings = 'Gestion des amandes ';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  prets: Prêts[];
  loaders: boolean;
  selectedPret: Prêts;
  amandeForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  techForm: FormGroup;

  users: User[];
  closeResult: any;
  pages: number;
  id: number;
  private roles: string[];
  public authority: string;

  constructor(private fb: FormBuilder,
              private pretServices: PretService,
              private userServices: UserService,
              private modalService: NgbModal,
              private tokenStorage: TokenStorageService,
              private _location: Location,
  ) {
    this.selectedPret = new Prêts();
    this.createForm1();
    this.createForms();
    this.createForm();
    this.pageForms();
    this.pages = 7;
    this.loaders = false;
  }

  createForm() {
    this.techForm = this.fb.group({
      membre: ['', [Validators.required]],
      date: ['', [Validators.required]],
      montant: ['', [Validators.required]],
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
    this.allPrets();
    this.loadUsers();
  }

  allPrets() {
    this.pretServices.getPrets().subscribe(
        data => {
          this.prets = data;
        } ,
        error => {
          console.log('les amandes ne se sont pas chargées correctement');
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          console.log('Liste des prêts: ', this.prets);
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

  open(content){
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
          this.closeResult = `Closed with: ${result}`;
        }, (reason) =>{

        }
    );
  }

  rembourser(p: Prêts){
    console.log('remboursé ', p.nom);
  }

  loadUsers() {
    this.userServices.getActiveUsers().subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.log('une erreur a été détectée lors du chargement des utilisateurs!');
        },
        () => {
          console.log('chargement des techniciens actifs');
        }
    );
  }

  addPret() {
    const Swal = require('sweetalert2');
    // this.selectedTontine.name = this.planForm.controls['membre'].value;
    // this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.techForm.controls['membre'].value;
    this.selectedPret.date_pret = this.techForm.controls['date'].value;
    this.selectedPret.montant_prete = this.techForm.controls['montant'].value;
    console.log('membre', this.id);
    console.log('membre', this.selectedPret);
    this.pretServices.newPret(this.id, this.selectedPret).subscribe(
        res => {
          // this.initPlan();
          this.allPrets();
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
