import { Component, OnInit } from '@angular/core';
import {Prêts} from "../../Models/prets";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PretService} from "../../services/pret/pret.service";
import {TokenStorageService} from "../../auth/token-storage.service";

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
  loaders: boolean = false;
  selectedPret: Prêts;
  amandeForm: FormGroup;
  searchPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  pages: number = 7;

  constructor(private fb: FormBuilder,
              private pretServices: PretService,
              private tokenStorage: TokenStorageService,
  ) {
    this.selectedPret = new Prêts
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
    this.allPrets();
  }

  allPrets(){
    this.pretServices.getPrets().subscribe(
        data => {
          this.prets = data;
        } ,
        error => {
          console.log('les amandes ne se sont pas chargées correctement')
          this.loaders = false;
        },
        () => {
          this.loaders = false;
          console.log("Liste des amandes: ",this.prets)
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
