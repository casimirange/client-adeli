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
}
