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

  constructor(private fb: FormBuilder,
              private userServices: UserService,
              private planingServices: PlaningService) {
    this.createForm();
    this.selectedPlanning = new Planing();
  }

  ngOnInit() {
    this.Planing();
    this.loadUsers();
  }

  createForm() {
    this.planForm = this.fb.group({
      date: ['', [Validators.required]],
      membre: ['', ],
      evenement: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  Planing(){
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
          console.log("Planing: ",this.planings)
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
}
