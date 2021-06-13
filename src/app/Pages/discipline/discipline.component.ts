import { Component, OnInit } from '@angular/core';
import {Discipline} from "../../Models/discipline";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DisciplineService} from "../../services/discipline/discipline.service";
import {UserService} from "../../services/user/user.service";
import {User} from "../../Models/users";

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
  disciplines: Discipline[];
  selectedDiscipline: Discipline;
  discForm: FormGroup;
  users: User[];
  operation: string = 'add';
  id: number;
  p: number;

  constructor(private fb: FormBuilder,
              private userServices: UserService,
              private disciplineService: DisciplineService) {
    this.selectedDiscipline = new Discipline();
    this.createForm();
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
    this.loadDisciplines();
    this.loadUsers();
  }

  loadDisciplines() {
    this.disciplineService.getDiscipline().subscribe(
        data => {
          this.disciplines = data

        },
        error => {
          console.log('une erreur a été détectée lors du chargement des disciplines')
        },
        () => {
          console.log('chargement des disciplines', this.disciplines);
        }
    );
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

  addDiscipline() {
    const Swal = require('sweetalert2');
    // this.selectedTontine.name = this.planForm.controls['membre'].value;
    // this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.discForm.controls['membre'].value;
    this.selectedDiscipline.date = this.discForm.controls['date'].value;
    this.selectedDiscipline.type = this.discForm.controls['type'].value;
    this.selectedDiscipline.sanction = this.discForm.controls['sanction'].value;
    console.log('membre', this.id);
    console.log('membre', this.selectedDiscipline);
    this.disciplineService.newDiscipline(this.id, this.selectedDiscipline).subscribe(
        res => {
          // this.initPlan();
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
}
