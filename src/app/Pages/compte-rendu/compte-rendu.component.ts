import { Component, OnInit, ViewChild } from '@angular/core';
// import { CKEditorComponent } from 'ng2-ckeditor';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompteRenduService} from "../../services/compte_rendu/compte-rendu.service";
import {CompteRendu} from "../../Models/cr";

@Component({
  selector: 'app-compte-rendu',
  templateUrl: './compte-rendu.component.html',
  styleUrls: ['./compte-rendu.component.scss'],
})
export class CompteRenduComponent implements OnInit {

  headings = 'Compte Rendu';
  subheadings = 'Retrouvez le rapport de chaque séance ordinaires et extraordinaires';
  icons = 'pe-7s-news-paper icon-gradient bg-mixed-hopes';
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  crForm: FormGroup;
  compteRendus: CompteRendu[] = [];
  compteRendu: CompteRendu;
  id: number;
  details: string;
  date: Date;
  loaders: boolean;
  // @ViewChild("myckeditor", {static: false}) ckeditor: CKEditorComponent;

  constructor(private fb: FormBuilder,
  private compteRenduservice: CompteRenduService) {
    this.mycontent = ``;
    this.createForm();
    this.compteRendu = new CompteRendu();
    this.loaders = false;
  }

  createForm() {
    this.crForm = this.fb.group({
      dat: ['', [Validators.required]],
      cp: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };

    this.loadCR();
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onChange2(th: CompteRendu): void {
    this.id = th.id_compte_rendu;
    this.details = th.details;
    this.date = th.date;
    this.mycontent = th.details;
  }

  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  swl(tec: any){
    const Swal = require('sweetalert2');
    console.log('voici le CR:', this.mycontent);
    Swal.fire({
      title: 'test',
      html:  tec,
      icon:'question' ,
      showCancelButton: true,

      confirmButtonColor: '#00ace6',
      cancelButtonColor: '#f65656',
      confirmButtonText: 'OUI',
      cancelButtonText: 'Annuler',
      allowOutsideClick: true,
      focusConfirm: false,
      focusCancel: false,
      focusDeny: true,
      showLoaderOnConfirm: true
    }).then((result) => {
      if (result.value) {
        // this.activeTechnicien();
        Swal.fire({
        })
      }
    })
  }

  initCR() {
    this.compteRendu = new CompteRendu();
    this.createForm();
    this.mycontent = '';
  }

  addCR() {
    const t = this.crForm.value;

    console.log('date', this.crForm.controls['dat'].value);
    console.log('msg', this.crForm.controls['cp'].value);


    this.compteRendu.date = this.crForm.controls['dat'].value;
    this.compteRendu.details = this.crForm.controls['cp'].value;

    // if(this.mycontent == ''){
    //   const Swal = require('sweetalert2');
    //   console.log('voici le CR:', this.crForm.controls['cp'].value);
    //   Swal.fire({
    //     title: 'Attention',
    //     icon:'warning' ,
    //     showCancelButton: false,
    //     html: 'le compte rendu de la séance ne peut être vide!',
    //     confirmButtonColor: 'brown',
    //     confirmButtonText: 'OK',
    //     allowOutsideClick: true,
    //     focusConfirm: true,
    //   })
    // }
    //dès qu'on crée le département on affiche immédiatement la liste
    this.compteRenduservice.addCR(this.compteRendu).subscribe(
        res => {
          this.initCR();
          this.loadCR();
        }
    );

  }

  loadCR() {
    this.loaders = true;
    this.compteRenduservice.getCR().subscribe(
        data => {
          this.compteRendus = data;

        },
        error => {
          console.log('une erreur de chargement des Comptes rendus!');
          this.loaders = false;
        },
        () => {
          console.log('chargement des comptes rendus', this.compteRendus);
          this.loaders = false;
        }
    );
  }

}
