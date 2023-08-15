import { Component, OnInit, ViewChild } from '@angular/core';
// import { CKEditorComponent } from 'ng2-ckeditor';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompteRenduService} from "../../services/compte_rendu/compte-rendu.service";
import {CompteRendu} from "../../Models/cr";
import {TokenStorageService} from "../../auth/token-storage.service";
import Swal from "sweetalert2";
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
  operation: string = 'add';
  crForm: FormGroup;
  compteRendus: CompteRendu[] = [];
  compteRendu: CompteRendu;
  selectedCompteRendu: CompteRendu;
  id: number;
  details: string;
  date: Date;
  loaders: boolean;
  private roles: string[];
  public authority: string;
  // @ViewChild("myckeditor", {static: false}) ckeditor: CKEditorComponent;

  constructor(private fb: FormBuilder,
              private tokenStorage: TokenStorageService,
              private compteRenduservice: CompteRenduService) {
    this.mycontent = ``;
    this.createForm();
    this.compteRendu = new CompteRendu();
    this.selectedCompteRendu = new CompteRendu();
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
    this.loadCR();
  }

  onChange($event: any): void {
    // console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onChange2(th: CompteRendu): void {
    this.id = th.id_compte_rendu;
    this.details = th.details;
    this.date = th.date;
    this.mycontent = th.details;
  }

  onPaste($event: any): void {
    // console.log("onPaste");
    //this.log += new Date() + "<br />";
  }

  swl(tec: any){
    // const Swal = require('sweetalert2');
    // console.log('voici le CR:', this.mycontent);
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
    this.selectedCompteRendu = new CompteRendu();
    this.createForm();
    this.mycontent = '';
  }

  addCR() {
    const t = this.crForm.value;

    // console.log('date', this.crForm.controls['dat'].value);
    // console.log('msg', this.crForm.controls['cp'].value);


    this.compteRendu.date = this.crForm.controls['dat'].value;
    this.compteRendu.details = this.crForm.controls['cp'].value;

    // if(this.mycontent == ''){
    //   const Swal = require('sweetalert2');
    //   // console.log('voici le CR:', this.crForm.controls['cp'].value);
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
          // console.log('une erreur de chargement des Comptes rendus!');
          this.loaders = false;
        },
        () => {
          // console.log('chargement des comptes rendus', this.compteRendus);
          this.loaders = false;
        }
    );
  }

  updateCR() {
    // console.log('update', this.selectedCompteRendu);
    // const Swal = require('sweetalert2');
    this.selectedCompteRendu.details = this.crForm.controls['cp'].value;
    this.compteRenduservice.putCompteRendu(this.selectedCompteRendu.id_compte_rendu, this.selectedCompteRendu).subscribe(
        res => {
          this.initCR();
          this.loadCR();
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

  deleteCompteRendu(tec: CompteRendu){
    // const Swal = require('sweetalert2');
    Swal.fire({
      title: 'Suppression',
      icon: 'error',
      html: 'Voulez-vous supprimer ce communique du ' + tec.date + ' ?',
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
        this.compteRenduservice.deleteCompteRendu(tec.id_compte_rendu).subscribe(
            data => { this.loadCR(); },
            error => {
              // console.log('une erreur a été détectée lors de la suppression du compte rendu');
            },
            () => {
              // console.log('compte rendu supprimé');
            }
        );
        Swal.fire({
          title: 'Suppression',
          text: 'Compte Rendu supprimé avec succès!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }
}
