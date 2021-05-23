import { Component, OnInit } from '@angular/core';
import {Amandes} from "../../Models/amandes";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AmandesService} from "../../services/amandes/amandes.service";
import {TokenStorageService} from "../../auth/token-storage.service";

@Component({
  selector: 'app-amandes',
  templateUrl: './amandes.component.html',
  styleUrls: ['./amandes.component.scss']
})
export class AmandesComponent implements OnInit {

  headings = 'Amandes';
  subheadings = 'Gestion des amandes ';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  amandes: Amandes[];
  loaders: boolean = false;
  selectedAmande: Amandes;
  amandeForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  pages: number = 7;

  constructor(private fb: FormBuilder,
              private amandeServices: AmandesService,
              private tokenStorage: TokenStorageService,
  ) {
    this.selectedAmande = new Amandes
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
    this.allAmandes();
  }

  allAmandes(){
    this.amandeServices.getAmandes().subscribe(
        data => {
          this.amandes = data;
        } ,
        error => {
          console.log('les amandes ne se sont pas chargées correctement')
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          console.log("Liste des amandes: ",this.amandes)
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
