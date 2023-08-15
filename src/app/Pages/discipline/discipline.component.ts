import { Component, OnInit } from '@angular/core';
import {Discipline} from "../../Models/discipline";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DisciplineService} from "../../services/discipline/discipline.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../Models/users";
import {TokenStorageService} from "../../auth/token-storage.service";
import Swal from "sweetalert2";
@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent implements OnInit {

  headings = 'Discipline';
  subheadings = 'Gerez les retards, absences et sanctions ';
  icons = 'pe-7s-news-paper icon-gradient bg-mixed-hopes';

  type: string[] = ['Absence', 'Retard', 'Trouble'];
  disciplines: Discipline[] = [];
  selectedDiscipline: Discipline;
  discForm: FormGroup;
  users: User[];
  operation: string = 'add';
  id: number;
  p: number;
  loaders: boolean;
  private roles: string[];
  public authority: string;

  constructor(private fb: FormBuilder,
              private userServices: UserService,
              private tokenStorage: TokenStorageService,
              private disciplineService: DisciplineService) {
    this.selectedDiscipline = new Discipline();
    this.loaders = false
    this.createForm();
  }

  initDisci() {
    this.createForm();
    this.selectedDiscipline = new Discipline();
  }
  createForm() {
    this.discForm = this.fb.group({
      date: ['', [Validators.required]],
      membre: ['', [Validators.required]],
      type: ['', [Validators.required]],
      sanction: ['', [Validators.required, Validators.minLength(5)]],
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
    this.loadDisciplines();
    this.loadUsers();
  }

  loadDisciplines() {
    this.loaders = true;
    this.disciplineService.getDiscipline().subscribe(
        data => {
          this.disciplines = data;

        },
        error => {
          // console.log('une erreur a été détectée lors du chargement des disciplines');
          this.loaders = false;
        },
        () => {
          // console.log('chargement des disciplines', this.disciplines);
          this.loaders = false;
        }
    );
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

  // deleteDiscipline() {
  //   this.disciplineService.deleteDiscipline(this.selectedDiscipline.id_discipline).subscribe(
  //       data => {
  //         this.users = data;
  //       },
  //       error => {
  //         // console.log('une erreur a été détectée lors du chargement des utilisateurs!');
  //       },
  //       () => {
  //         // console.log('chargement des techniciens actifs');
  //       }
  //   );
  // }

  addDiscipline() {
    // const Swal = require('sweetalert2');
    // this.selectedTontine.name = this.planForm.controls['membre'].value;
    // this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.discForm.controls['membre'].value;
    this.selectedDiscipline.date = this.discForm.controls['date'].value;
    this.selectedDiscipline.type = this.discForm.controls['type'].value;
    this.selectedDiscipline.sanction = this.discForm.controls['sanction'].value;
    // console.log('membre', this.id);
    // console.log('membre', this.selectedDiscipline);
    this.disciplineService.newDiscipline(this.id, this.selectedDiscipline).subscribe(
        res => {
          this.initDisci();
          this.loadDisciplines();
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

  updateDiscipline() {
    // const Swal = require('sweetalert2');
    // this.selectedTontine.name = this.planForm.controls['membre'].value;
    // this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.discForm.controls['membre'].value;
    this.selectedDiscipline.date = this.discForm.controls['date'].value;
    this.selectedDiscipline.type = this.discForm.controls['type'].value;
    this.selectedDiscipline.sanction = this.discForm.controls['sanction'].value;
    // console.log('membre', this.id);
    // console.log('membre', this.selectedDiscipline);
    this.disciplineService.putDiscipline(this.id, this.selectedDiscipline.id_discipline,this.selectedDiscipline).subscribe(
        res => {
          this.initDisci();
          this.loadDisciplines();
          this.operation = 'add';
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
            title: 'Echec de modification',
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
            text: 'modification updated',
            title: 'Modification réussi!'
          });
        }
    );
  }

  deleteDiscipline(tec: Discipline){
    // const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Suppression',
      icon: 'error',
      html: 'Voulez-vous supprimer cette sanction de ' + tec.name.bold() + ' ?',
      showCancelButton: true,
      footer: '<a >Cette action est irréversible</a>',
      confirmButtonColor: '#00ace6',
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: false,
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        this.disciplineService.deleteDiscipline(tec.id_discipline).subscribe(
            data => { this.loadDisciplines(); },
            error => {
              // console.log('une erreur a été détectée lors de la suppression de la discipline');
            },
            () => {
              // console.log('sanction supprimée');
            }
        );
        Swal.fire({
          title: 'Suppression',
          text: 'Sanction supprimée avec succès!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}
