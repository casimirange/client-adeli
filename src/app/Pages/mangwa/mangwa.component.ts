import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Mangwas} from "../../Models/mangwa";
import {MangwaService} from "../../services/mangwa/mangwa.service";
import {RetenueService} from "../../services/retenue/retenue.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../Models/users";
import Swal from "sweetalert2";
@Component({
  selector: 'app-mangwa',
  templateUrl: './mangwa.component.html',
  styleUrls: ['./mangwa.component.scss']
})
export class MangwaComponent implements OnInit {

  headings = 'Mangwa';
  subheadings = 'Gestion du Mangwa ';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  mangwas: Mangwas[] = [];
  loaders: boolean = false;
  selectedMangwa: Mangwas;
  amandeForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  pages: number = 7;
  id: number;
  techForm: FormGroup;
  users: User[];
  fonction: string[] = ['Crédit', 'Débit'];
  private roles: string[];
  public authority: string;

  p: number;
  constructor(private fb: FormBuilder,
              private userServices: UserService,
              private mangwaServices: RetenueService,
              private tokenStorage: TokenStorageService,
  ) {
    this.selectedMangwa = new Mangwas();
    this.createForm1();
    this.createForms();
    this.createForm();
    this.pageForms();
    this.loadUsers();
  }

  createForm() {
    this.techForm = this.fb.group({
      membre: ['', [Validators.required]],
      date: ['', [Validators.required]],
      fonction: ['', [Validators.required]],
      montant: ['', [Validators.required]],
      motif: ['', [Validators.required, Validators.minLength(5)]],
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
    this.loadMangwa();
  }

  loadMangwa(){
    this.loaders =  true;
    this.mangwaServices.getMangwa().subscribe(
        data => {
          this.mangwas = data;
        } ,
        error => {
          // console.log('erreur chargement mangwa')
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          // console.log("Liste mangwa: ",this.mangwas)
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

  addMangwa() {
    // const Swal = require('sweetalert2');
    // this.selectedTontine.name = this.planForm.controls['membre'].value;
    // this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.techForm.controls['membre'].value;
    this.selectedMangwa.credit = this.techForm.controls['fonction'].value == 'Crédit' ? this.techForm.controls['montant'].value : 0;
    this.selectedMangwa.debit = this.techForm.controls['fonction'].value == 'Débit' ? this.techForm.controls['montant'].value : 0;
    this.selectedMangwa.date = this.techForm.controls['date'].value;
    this.selectedMangwa.motif = this.techForm.controls['motif'].value;
    this.selectedMangwa.transaction = this.techForm.controls['fonction'].value;
    // console.log('membre', this.id);
    // console.log('membre', this.selectedMangwa);
    this.mangwaServices.newMangwa(this.id, this.selectedMangwa).subscribe(
        res => {
          // this.initPlan();
          this.loadMangwa();
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
