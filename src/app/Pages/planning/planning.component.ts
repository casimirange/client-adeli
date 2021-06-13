import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user/user.service";
import {Planing} from "../../Models/Planing";
import {DisciplineService} from "../../services/discipline/discipline.service";
import {PlaningService} from "../../services/planing/planing.service";
import {User} from "../../Models/users";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  headings = 'Planning';
  subheadings = 'Gerez le calendrier des jours de réunion';
  icons = 'pe-7s-news-paper icon-gradient bg-mixed-hopes';

  planings: Planing[];
  selectedPlanning: Planing;
  loaders: boolean = false;
  planForm: FormGroup;
  users: User[];
  id: any;
  operation: string;
  p: number;

  constructor(private fb: FormBuilder,
              private userServices: UserService,
              private planingServices: PlaningService) {
    this.createForm();
    this.selectedPlanning = new Planing();
    this.operation = 'add';
  }

  ngOnInit() {
    this.Planing();
    this.loadUsers();
  }

  createForm() {
    this.planForm = this.fb.group({
      date: ['', [Validators.required]],
      membre: ['', [Validators.required]],
      // evenement: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  initPlan() {
    this.selectedPlanning = new Planing();
    this.createForm();
  }

  Planing(){
    this.planings = [];
    this.planingServices.getPlaning().subscribe(
        data => {
          this.planings = data;

        } ,
        error => {
          console.log('une erreur sur planing a été détectée!')
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          console.log("Planing: ",this.planings);
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

  addPlanning() {
    const Swal = require('sweetalert2');
    this.selectedPlanning.name = this.planForm.controls['membre'].value;
    this.selectedPlanning.date = this.planForm.controls['date'].value;
    this.id = this.planForm.controls['membre'].value;
    this.planingServices.newPlanning(this.selectedPlanning, this.id).subscribe(
        res => {
          this.initPlan();
          this.Planing();
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

  updatePlanning(p: Planing) {
    const Swal = require('sweetalert2');
    console.log('le planing sélectionné est ', p)
    this.id = this.planForm.controls['membre'].value;
    this.planingServices.updatePlanning(p, this.id, p.id).subscribe(
        res => {
          this.initPlan();
          this.Planing();
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
