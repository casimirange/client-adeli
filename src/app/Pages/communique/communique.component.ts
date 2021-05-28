import { Component, OnInit, ViewChild } from '@angular/core';
// import { CKEditorComponent } from 'ng2-ckeditor';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompteRenduService} from "../../services/compte_rendu/compte-rendu.service";
import {CompteRendu} from "../../Models/cr";
import {Communique} from "../../Models/communique";
import {CommuniqueService} from "../../services/communique/communique.service";

@Component({
  selector: 'app-communique',
  templateUrl: './communique.component.html',
  styleUrls: ['./communique.component.scss']
})
export class CommuniqueComponent implements OnInit {

  headings = 'Communiqué';
  subheadings = 'Tous les communiqués seront étités et retransmis à tous les membres de ADELI';
  icons = 'pe-7s-note2 icon-gradient bg-mixed-hopes';
  name = 'ng2-ckeditor';
  ckeConfig: any;
  mycontent: string;
  log: string = '';
  crForm: FormGroup;
  communiques: Communique[];
  communique: Communique;
  id: number;
  details: string;
  date: Date;
  // @ViewChild("myckeditor", {static: false}) ckeditor: CKEditorComponent;

  constructor(private fb: FormBuilder,
              private communiqueService: CommuniqueService) {
    this.mycontent = ``;
    this.createForm();
    this.communique = new Communique;
  }

  createForm() {
    // this.crForm = this.fb.group({
    //   dat: ['', [Validators.required]],
    // });
  }

  ngOnInit() {
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };

    this.loadCommunique();
  }

  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onChange2(th: Communique): void {
    this.id = th.id_communique;
    this.details = th.details;
    this.date = th.date;
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
    this.communique = new Communique();
    // this.createForm();
    this.mycontent = '';
  }

  addCR() {
    // const t = this.crForm.value;

    // console.log('date', this.crForm.controls['dat'].value);
    console.log('msg', this.mycontent);


    // this.communique.date = this.crForm.controls['dat'].value;
    this.communique.details = this.mycontent;

    if(this.mycontent == ''){
      const Swal = require('sweetalert2');
      console.log('voici le communiqué:', this.mycontent);
      Swal.fire({
        title: 'Attention',
        icon:'warning' ,
        showCancelButton: false,
        html: 'le communiqué ne peut être vide!',
        confirmButtonColor: 'brown',
        confirmButtonText: 'OK',
        allowOutsideClick: true,
        focusConfirm: true,
      })
    }
    //dès qu'on crée le département on affiche immédiatement la liste
    this.communiqueService.addCommunique(this.communique).subscribe(
        res => {
          this.initCR();
          this.loadCommunique();
        }
    );

  }

  loadCommunique() {
    this.communiqueService.getCommunique().subscribe(
        data => {
          this.communiques = data

        },
        error => {
          console.log('une erreur de chargement des CR a été détectée!')
        },
        () => {
          console.log('chargement des communiqués', this.communiques);
        }
    );
  }

}
