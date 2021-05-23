import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Mangwas} from "../../Models/mangwa";
import {MangwaService} from "../../services/mangwa/mangwa.service";
import {RetenueService} from "../../services/retenue/retenue.service";

@Component({
  selector: 'app-mangwa',
  templateUrl: './mangwa.component.html',
  styleUrls: ['./mangwa.component.scss']
})
export class MangwaComponent implements OnInit {

  headings = 'Amandes';
  subheadings = 'Gestion des amandes ';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  mangwas: Mangwas[];
  loaders: boolean = false;
  selectedMangwa: Mangwas;
  amandeForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  pages: number = 7;

  constructor(private fb: FormBuilder,
              private mangwaServices: RetenueService,
              private tokenStorage: TokenStorageService,
  ) {
    this.selectedMangwa = new Mangwas
    this.createForm1();
    this.createForms();
    this.pageForms();
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
    this.loadMangwa();
  }

  loadMangwa(){
    this.mangwaServices.getMangwa().subscribe(
        data => {
          this.mangwas = data;
        } ,
        error => {
          console.log('les amandes ne se sont pas chargées correctement')
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          console.log("Liste des amandes: ",this.mangwas)
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

}
