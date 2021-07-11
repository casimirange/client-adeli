import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {User} from "../../Models/users";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../auth/token-storage.service";
import {Prêts} from "../../Models/prets";
import {Tontines} from "../../Models/tontines";
import {Amandes} from "../../Models/amandes";
import {DisciplineService} from "../../services/discipline/discipline.service";
import {Discipline} from "../../Models/discipline";

@Component({
  selector: 'app-use-component',
  templateUrl: './use-component.component.html',
  styleUrls: ['./use-component.component.scss']
})
export class UseComponentComponent implements OnInit {

  heading = "dep";
  subheading = 'Retrouvez la fiche historique de ce membre ADELI';
  icon = 'fa fa-home icon-gradient';
  bg = 'text-white bg-midnight-bloom';

  term: string;
  p: number;
  div: boolean;
  selectedUser: User;
  prets: Prêts[] = [];
  tontines: Tontines[] = [];
  amandes: Amandes[] = [];
  disciplines: Discipline[] = [];
  rangeForm: FormGroup;
  pageForm: FormGroup;
  ranger:string = "false";
  noms:string ;
  pages:number = 7;
  public url: any;
  tail: number;
  closeResult: any;
  loaders: boolean = false;
  loade: boolean = false;
  loadeAmande: boolean = false;
  loadeDiscipline: boolean = false;

  hourThisMonth: any;
  hourLastMonth: any;


  constructor(private userService: UserService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private route: ActivatedRoute) {
    this.selectedUser = new User();
    // this.selectedPanne = new Pannes();
    //   this.createForm();
    //   this.createForms();
    //   this.rangeForms();
    //   this.pageForms();
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.url = atob(params['id']);
    // });
    this.showMachine();
    this.showPret();
    this.showTontine();
    this.showAmande();
    this.showDiscipline();
  }

  showMachine() {
    console.log('test')
    this.route.params.subscribe(params => {
        const urls = Number.parseInt(atob(params['id']));
        this.noms = '';
        this.userService.getUser(urls).subscribe(
            res => {
                this.selectedUser = res;
                this.noms = this.selectedUser.name;
            } ,
            error => {
                console.log('erreur chargement de l\'utilisateur');
                // this.load = false;
            },
            () => {
                // this.load= false;
                console.log('Liste des prêts: ', this.selectedUser);
            }
        );
    });
  }

  showPret() {
    console.log('test')
    this.route.params.subscribe(params => {
        const urls = Number.parseInt(atob(params['id']));
      this.loaders = true;
      this.userService.getPret(urls).subscribe(
          data => {
            this.prets = data;
          } ,
          error => {
            console.log('les amandes ne se sont pas chargées correctement');
            this.loaders = false;
          },
          () => {
            this.loaders = false;
            console.log('Liste des prêts: ', this.prets);
          }
      );
    })
  }

  showTontine() {
    console.log('test')
    this.route.params.subscribe(params => {
        const urls = Number.parseInt(atob(params['id']));
      this.loaders = true;
        this.loade = true;
        this.userService.getTontine(urls).subscribe(
            data => {
                this.tontines = data
            },
            error => {
                console.log('une erreur tontine active');
                this.loade = false;
            },
            () => {
                console.log('chargement tontine active', this.tontines);
                this.loade = false;
            }
        );
    })
  }

  showAmande() {
    console.log('test')
    this.route.params.subscribe(params => {
        const urls = Number.parseInt(atob(params['id']));
        this.loadeAmande = true;
        this.userService.getAmande(urls).subscribe(
            data => {
                this.amandes = data;
            } ,
            error => {
                console.log('les amandes ne se sont pas chargées correctement');
                this.loadeAmande = false;
            },
            () => {
                this.loadeAmande = false;
                console.log('Liste des amandes: ', this.amandes);
            }
        );
    })
  }

  showDiscipline() {
    console.log('test')
    this.route.params.subscribe(params => {
        const urls = Number.parseInt(atob(params['id']));
        this.loadeDiscipline = true;
        this.userService.getDiscipline(urls).subscribe(
            data => {
                this.disciplines = data;

            },
            error => {
                console.log('une erreur a été détectée lors du chargement des disciplines');
                this.loadeDiscipline = false;
            },
            () => {
                console.log('chargement des disciplines', this.disciplines);
                this.loadeDiscipline = false;
            }
        );
    })
  }
}
