import { Component, OnInit, ViewChild } from '@angular/core';
// import { CKEditorComponent } from 'ng2-ckeditor';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CompteRenduService} from "../../services/compte_rendu/compte-rendu.service";
import {CompteRendu} from "../../Models/cr";
import {Communique} from "../../Models/communique";
import {CommuniqueService} from "../../services/communique/communique.service";
import {TokenStorageService} from "../../auth/token-storage.service";
import Swal from "sweetalert2";
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
  operation: string = 'add';
  crForm: FormGroup;
  communiques: Communique[] = [];
  communique: Communique;
  selectedCommunique: Communique;
  id: number;
  details: string;
  date: Date;
  loaders: boolean;
  private roles: string[];
  public authority: string;
  // @ViewChild("myckeditor", {static: false}) ckeditor: CKEditorComponent;

  constructor(private fb: FormBuilder,
              private tokenStorage: TokenStorageService,
              private communiqueService: CommuniqueService) {
    this.mycontent = ``;
    this.createForm();
    this.communique = new Communique();
    this.loaders = false;
  }

  createForm() {
    this.crForm = this.fb.group({
      cp: ['', [Validators.required]],
    });
  }

  initCom(){
    this.createForm();
    this.communique = new Communique();
  }

  ngOnInit() {
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
    this.ckeConfig = {
      allowedContent: false,
      extraPlugins: 'divarea',
      forcePasteAsPlainText: true
    };

    this.loadCommunique();
  }

  onChange($event: any): void {
    // console.log("onChange");
    //this.log += new Date() + "<br />";
  }

  onChange2(th: Communique): void {
    this.id = th.id_communique;
    this.details = th.details;
    this.date = th.date;
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
    this.communique = new Communique();
    this.selectedCommunique = new Communique();
    this.createForm();
    this.mycontent = '';
  }

  addCR() {
    // const t = this.crForm.value;

    // // console.log('date', this.crForm.controls['dat'].value);
    // console.log('msg', this.mycontent);


    // this.communique.date = this.crForm.controls['dat'].value;
    this.communique.details = this.crForm.controls['cp'].value;

    // if(this.mycontent == ''){
    //   const Swal = require('sweetalert2');
    //   // console.log('voici le communiqué:', this.mycontent);
    //   Swal.fire({
    //     title: 'Attention',
    //     icon:'warning' ,
    //     showCancelButton: false,
    //     html: 'le communiqué ne peut être vide!',
    //     confirmButtonColor: 'brown',
    //     confirmButtonText: 'OK',
    //     allowOutsideClick: true,
    //     focusConfirm: true,
    //   })
    // }
    //dès qu'on crée le département on affiche immédiatement la liste
    this.communiqueService.addCommunique(this.communique).subscribe(
        res => {
          this.initCR();
          this.loadCommunique();
        }
    );

  }

  updateCommunique() {
    // console.log('update', this.selectedCommunique);
    // const Swal = require('sweetalert2');
    this.selectedCommunique.details = this.crForm.controls['cp'].value;
    this.communiqueService.putCommunique(this.selectedCommunique.id_communique, this.selectedCommunique).subscribe(
        res => {
          this.initCR();
          this.loadCommunique();
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

  deleteCommunique(tec: Communique){
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
        this.communiqueService.deleteCommunique(tec.id_communique).subscribe(
            data => { this.loadCommunique(); },
            error => {
              // console.log('une erreur a été détectée lors de la suppression du communiqué');
            },
            () => {
              // console.log('communique supprimé');
            }
        );
        Swal.fire({
          title: 'Suppression',
          text: 'Communiqué supprimé avec succès!',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  }

  loadCommunique() {
    this.loaders = true;
    this.communiqueService.getCommunique().subscribe(
        data => {
          this.communiques = data;

        },
        error => {
          // console.log('une erreur de chargement des Communiqué!');
          this.loaders = false;
        },
        () => {
          // console.log('chargement des communiqués', this.communiques);
          this.loaders = false;
        }
    );
  }

}
