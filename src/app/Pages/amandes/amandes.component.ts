import { Component, OnInit } from '@angular/core';
import {Amandes} from "../../Models/amandes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AmandesService} from "../../services/amandes/amandes.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../Models/users";
import Swal from "sweetalert2";
@Component({
  selector: 'app-amandes',
  templateUrl: './amandes.component.html',
  styleUrls: ['./amandes.component.scss']
})
export class AmandesComponent implements OnInit {

  headings = 'Amandes';
  subheadings = 'Gestion des amandes ';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  p: number;
  amandes: Amandes[] = [];
  loaders: boolean = false;
  selectedAmande: Amandes;
  amandeForm: FormGroup;
  discForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  pages: number = 7;
  id: number;
  users: User[];
  private roles: string[];
  public authority: string;

  fonction: string[] = ['Crédit', 'Débit'];

  constructor(private fb: FormBuilder,
              private amandeServices: AmandesService,
              private userServices: UserService,
              private tokenStorage: TokenStorageService,
  ) {
    this.selectedAmande = new Amandes();
    this.createForm1();
    this.createForms();
    this.pageForms();
  }

  createForm1() {
    this.discForm = this.fb.group({
      membre: ['', [Validators.required]],
      date: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      montant: ['', [Validators.required]],
      motif: ['', [Validators.required]],
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
    this.allAmandes();
    this.loadUsers();
  }

  loadUsers() {
    this.userServices.getActiveUsers().subscribe(
        data => {
          this.users = data;
        },
        error => {
          // console.log('une erreur a été détectée lors du chargement des utilisateurs!');
        },
        () => {
          // console.log('chargement des techniciens actifs');
        }
    );
  }

  allAmandes(){
    this.loaders = true;
    this.amandeServices.getAmandes().subscribe(
        data => {
          this.amandes = data;
        } ,
        error => {
          // console.log('les amandes ne se sont pas chargées correctement');
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          // console.log('Liste des amandes: ', this.amandes);
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

  addAmande() {
    // const Swal = require('sweetalert2');
    // this.selectedTontine.name = this.planForm.controls['membre'].value;
    // this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.discForm.controls['membre'].value;
    this.selectedAmande.credit = this.discForm.controls['fonction'].value == 'Crédit' ? this.discForm.controls['montant'].value : 0;
    this.selectedAmande.debit = this.discForm.controls['fonction'].value == 'Débit' ? this.discForm.controls['montant'].value : 0;
    this.selectedAmande.date = this.discForm.controls['date'].value;
    this.selectedAmande.motif = this.discForm.controls['motif'].value;
    this.amandeServices.newAmande(this.id, this.selectedAmande).subscribe(
        res => {
          // this.initPlan();
          this.allAmandes();
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
