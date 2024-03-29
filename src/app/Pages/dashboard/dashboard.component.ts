import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Pannes} from "../../Models/pannes";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PannesService} from "../../services/pannes/pannes.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DashboardService} from "../../services/dashboard/dashboard.service";
import {BaseChartDirective, Color, Label} from "ng2-charts";
// import {ChartDataSets, ChartOptions} from "chart.js";
import {DatePipe, Location} from "@angular/common";
import {Arrets} from "../../Models/arrets";
import {ArretsService} from "../../services/arrets/arrets.service";
import {Departement} from "../../Models/departement";
import {Router} from "@angular/router";
import {Machine} from "../../Models/machines";
import {DepartementsService} from "../../services/departements/departements.service";
// import {AgGridAngular, AgGridModule} from "ag-grid-angular"
// import { AllCommunityModules } from 'ag-grid-community/dist/ag-grid-community';
import {
    ApexChart, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions, ApexStroke, ChartComponent
} from "ng-apexcharts";
import {UserService} from "../../services/user/user.service";
// import * as jsPDF from 'jspdf';
import Swal from "sweetalert2";
import  * as html2canvas from "html2canvas";
import {TokenStorageService} from "../../auth/token-storage.service";
import {RetenueService} from "../../services/retenue/retenue.service";
import {Planing} from "../../Models/Planing";
import {PlaningService} from "../../services/planing/planing.service";
import {ReunionService} from "../../services/reunion/reunion.service";
import {SessionService} from "../../services/session/session.service";
import {NotificationsService} from "../../services/notifications/notifications.service";
import {AmandesService} from "../../services/amandes/amandes.service";
import {BureauService} from "../../services/bureau/bureau.service";
import {Bureau} from "../../Models/bureau";

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    stroke: ApexStroke;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
    private roles: string[];
    authority: string;
    public chartOptions: Partial<any>;
    ranger: string = "false";
    ranges: string = "false";
    pages: number = 7;
    board: string;
    errorMessage: string;
    series: any[] = [];
    dah: number = 0;
    soldeTontine: number;
    soldeAmande: number;
    soldeMangwa: number;
    planings: Planing[] = [];
    date_creation_reunion: any;
    fondateur_reunion: string;
    activeSession: any = {};
    countUser: any;

  headings = 'Tableau de Bord';
  subheadings = 'Ayez une visuel global sur ADELI';
  icons = 'fa fa-desktop icon-gradient bg-royal';

  searchPanForm: FormGroup;
  dashPanForm: FormGroup;
  selectPanForm: FormGroup;
  pageForm: FormGroup;
  rangeForm: FormGroup;
  pannes: Pannes[] = [];
  // ThisWeekPannes: Pannes[];
  countPannes: number;
  cpannes: any[] = [];
  StatsTec: any[];
  Tpannes: Pannes[] = [];
  Hpannes: Pannes[] = [];
  departement: Departement[] = [];
  py: Pannes[] = [];
  pm: Pannes[] = [];
  pt: Pannes[] = [];
  nbreThisYear: Pannes[] = [];
  nbreLastMonth: Pannes[] = [];
  lastMonth: number;
  mtbfY: Pannes[] = [];
  mtbfTY: Pannes[] = [];
  mtbf: Pannes[] = [];
  arrets: Arrets[] = [];
  arretsLength: number;
  cdpannes: Pannes[] = [];
  cdpannesLength: number;
  Opannes: Pannes[] = [];
  Detailspannes: Pannes[] = [];
  Outilpannes: Pannes[] = [];
  times: Pannes[] = [];
  selectedPanne: Pannes;
  selectedArret: Arrets;
  tail: number;
  tails: number;
  count: number;
  cdount: number;
  tount: number;
  closeResult: any;
  TDT: number = 0;
  t1: Pannes[] = [];
  t2: Pannes[] = [];
  t3: Pannes[] = [];

  years: Pannes[] = [];
  month: Pannes[] = [];
  all: any[];

  dataPanne = {
    labels: [],
    datasets: []
  };

  datas = {
      labels: [] = [],
      datasets: [] = []
  };

  mdtByYear = {
      labels: [],
      datasets: []
  };

  mtbfByYear = {
      labels: [],
      datasets: []
  };

    test = {
        labs:  {
            type: "category",
            categories: []
        },
        datasets: []
    };

    tests = {
        categories: []
    };


  type: string = "bar";

  recapMonthFailure: any[];

    public datasets = [
        {
            label: '',
            data: [1,2],
            datalabels: {
                display: false,
            },

        }
    ];


    public colors: Color[] = [
        { // grey
            backgroundColor: 'rgba(247, 185, 36, 0.2)',
            borderColor: '#f7b924',
            borderCapStyle: 'round',
            borderDash: [],
            borderWidth: 1,
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: '#f7b924',
            pointBackgroundColor: '#fff',
            pointHoverBorderWidth: 4,
            pointRadius: 6,
            pointBorderWidth: 5,
            pointHoverRadius: 8,
            pointHitRadius: 10,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#f7b924',
        },
        { // dark grey
            backgroundColor: 'rgba(0, 227, 150,0.2   )',
            borderColor: 'rgba(0, 227, 150,1)',
            borderWidth: 1,
            pointBackgroundColor: 'rgba(0, 227, 150,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 227, 150,1)'
        },
        { // red
            backgroundColor: 'transparent',
            borderColor: '#fff',
            pointBackgroundColor: 'rgba(255,255,255,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,255,255,0.8)'
        }
    ]

    public options = {
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    display: false,
                    beginAtZero: true
                },
                gridLines: {
                    display: false
                }
            }],
            xAxes: [{
                ticks: {
                    display: false
                },
                gridLines: {
                    display: false
                }
            }]
        },
        legend: {
            display: false
        },
        responsive: true,
        maintainAspectRatio: false
    };

    public todatpannes: Pannes[];
    public todatpannesLength: number;

    y: number = 0;

    cause1: string;
    details1: string;
    desc1: string;
    cause2: string;
    details2: string;
    desc2: string;
    ha1: any;
    di1: any;
    fi1: any;
    ha2: any;
    di2: any;
    fi2: any;
    outil1: any;
    qte1: any;
    ref1: any;
    outil2: any;
    qte2: any;
    ref2: any;
    OP1: any;
    OP2: any;

    term: string;
    tech: string;
    pann: string;
    p: number;
    f: Date;
    d: Date;
    loade: boolean = false;
    mini_loader: boolean = false;
    loaders: boolean = false;
    loader: boolean = false;
    periode_panne: string = 'pannes de la semaine';
    nombre: number = 0;
    per_dash: string;
    per_pan: string;
    per_tec: string;
    cloaders: boolean = false;
    tloaders: boolean = false;
    notifications: any[];
    bureaux: Bureau[];
  constructor(private fb: FormBuilder,
              private panneService: PannesService,
              private arretService: ArretsService,
              private dashboardService: DashboardService,
              private amandeService: AmandesService,
              private retenueServices: RetenueService,
              private notificationServices: NotificationsService,
              private planingServices: PlaningService,
              private reuniongServices: ReunionService,
              private sessionServices: SessionService,
              private bureauService: BureauService,
              private usersServices: UserService,
              private departementService: DepartementsService,
              private userService: UserService,
              private datePipe: DatePipe,
              private _location: Location,
              private tokenStorage: TokenStorageService,
              private modalService: NgbModal, private router: Router  ) {


      this.createForm();
      this.createForms();
      this.dashForm();
      this.rangeForms();
      this.pageForms();
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

    createForm() {
        this.searchPanForm = this.fb.group({
            search: [''],
        });
    }

    rangeForms() {
        this.rangeForm = this.fb.group({
            date1: ['', Validators.required],
            date2: ['', Validators.required]
        });
    }

    dashForm() {
        this.dashPanForm = this.fb.group({
            dashPeriode: [''],
        });
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

    this.selectedPanne = new Pannes();
    this.selectedArret = new Arrets();
    // this.PanneToday();
    // this.LoadArrets();
    // this.loadDepartements();
    // this.countAllPannes();
    // this.countDepPannes();
    // this.loadTimePannes();
    // // this.getChart2();
    // this.last30days();
    // this.radialBar();
    // this.countThisYear();
    // // this.ThisWeekPanne();
    // this.ThisWeekPannes();
    //
    //
    // this.StatistiquesTechniciens();

    this.SoldeTontine();
    this.SoldeMangwa();
    this.Planing();
    this.Reunion();
    this.SessionActive();
    this.CountUsers();
    this.loadNotifs();
    this.SoldeAmande();
    this.last30days()
    this.loadBureau();
  }

    loadNotifs(){
        this.notificationServices.getNotifs().subscribe(
            data => {
                this.notifications = data;

            }
        );
    }

  countAllPannes(){

      this.cpannes = [];
      const dat = new Date();
      const dat1 = this.datePipe.transform(dat, 'MMM yyyy');
      this.per_pan = dat1;
      this.cloaders = true;
        this.panneService.getCountThisPannes().subscribe(
            data => {
                this.cpannes = data;
                this.count = 0;
                for (let pin of data){
                    this.count = this.count + pin.nbre;
                }
                this.cloaders = false
            },
            error => {
                // // console.log('une erreur a été détectée!')
                this.cloaders = false
            },
            () => {
                // // console.log('Total');
                // // console.log(this.count);
                // // console.log('machines totales');
                // // console.log(this.cpannes);
            }
        );
    }

  countAllLastMonthPannes(){
      this.cpannes = [];
      this.cloaders
      const dat = new Date();
      const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()-1), 'MMM');
      const x = dat.getMonth() == 1 ? this.datePipe.transform(dat.setFullYear(dat.getFullYear()-1), 'yyyy') : this.datePipe.transform(dat.setFullYear(dat.getFullYear()), 'yyyy')
      // // console.log('last Month: '+ dat1);
      this.per_pan = dat1+" "+x;
        this.panneService.getCountLastPannes().subscribe(
            data => {
                this.cpannes = data;
                this.count = 0;
                for (let pin of data){
                    this.count = this.count + pin.nbre;
                }
                this.cloaders = false

            },
            error => {
                this.cloaders = false
                // // console.log('une erreur a été détectée!')
            },
            () => {
                // // console.log('Total');
                // // console.log(this.count);
                // // console.log('machines totales');
                // // console.log(this.cpannes);
            }
        );
    }

  countAllRangePannes(){
      this.cpannes = [];
      this.cloaders
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
      this.per_pan = d1+" au "+d2;
        this.panneService.getCountRangePannes(d1, d2).subscribe(
            data => {
                this.cpannes = data;
                this.count = 0;
                for (let pin of data){
                    this.count = this.count + pin.nbre;
                }
                this.cloaders = false

            },
            error => {
                this.cloaders = false
                // // console.log('une erreur a été détectée!')
            },
            () => {
                // // console.log('Total');
                // // console.log(this.count);
                // // console.log('machines totales');
                // // console.log(this.cpannes);
            }
      );
  }

  StatistiquesTechniciens(){
      this.tloaders = true
      const dat = new Date();
      const dat1 = this.datePipe.transform(dat, 'MMM yyyy');
      this.per_tec = dat1;
        this.dashboardService.statsTechniciensByMonth().subscribe(
            data => {
                this.StatsTec = data;
                this.tloaders = false
            },
            error => {
                // // console.log('une erreur a été détectée!')
                this.tloaders = false
            },
            () => {
                // // console.log('Total');
                // // console.log(this.StatsTec);
            }
        );
    }

  StatistiquesTechniciensLastMonth(){
      this.tloaders = true
      const dat = new Date();
      const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()-1), 'MMM');
      const x = dat.getMonth() == 1 ? this.datePipe.transform(dat.setFullYear(dat.getFullYear()-1), 'yyyy') : this.datePipe.transform(dat.setFullYear(dat.getFullYear()), 'yyyy')
      // // console.log('last Month: '+ dat1);
      this.per_tec = dat1+" "+x;
        this.dashboardService.statsTechniciensLastMonth().subscribe(
            data => {
                this.StatsTec = data;
                this.tloaders = false
            },
            error => {
                // // console.log('une erreur a été détectée!')
                this.tloaders = false
            },
            () => {
                // // console.log('Total');
                // // console.log(this.StatsTec);
            }
        );
    }

  StatistiquesTechniciensRange(){
      this.tloaders = true
      const d1 = this.rangeForm.controls['date1'].value;
      const d2 = this.rangeForm.controls['date2'].value;
      this.per_tec = d1+" au "+d2;
        this.dashboardService.statsTechniciensRange(d1, d2).subscribe(
            data => {
                this.StatsTec = data;
                this.tloaders = false
            },
            error => {
                // // console.log('une erreur a été détectée!')
                this.tloaders = false
            },
            () => {
                // // console.log('Total');
                // // console.log(this.StatsTec);
            }
        );
    }

  countDepPannes(){
      this.cdount = 0;
      this.tount= 0;
        this.dashboardService.getCountDepPannes().subscribe(

            data => {
                this.cdpannes = data;

                for (let pin of this.cdpannes){
                    this.cdount = this.cdount + pin.nbre;
                }

            },
            error => {
                // // console.log('une erreur a été détectée!')
            },
            () => {
                // // console.log('Total');
                // // console.log(this.cdount);
            }
        );
    }


  last30days(){
      this.datas.labels = [];
      this.datas.datasets = [];
      this.loaders = true;
      this.dah = 0;
      this.per_dash = '30 Derniers Jours';
    const datasetNbrePanne3 = {
        data: [],
        label: "Membres",
        yAxisID: 'y-axis-0',
        backgroundColor: 'red',
        borderColor: '#0692fb',
    };
    const datasetNbrePanne4 = {
        data: [],
        label: "Cotisation",
        yAxisID: 'y-axis-1',
        type: 'line'
    };
    this.bureauService.getEvolution().subscribe(
        list => list.forEach(mach => {
            // datasetNbrePanne2.name = (mach.machine);
            this.datas.labels.push(this.datePipe.transform(mach.session, 'MMM-yyyy'));
            this.dah = this.datas.labels.length;
            datasetNbrePanne3.data.push(mach.nbre);
            datasetNbrePanne4.data.push(mach.montant);
            // this.loaders = false;
            // this.loaders = false
        } ),
        error => {
            // // console.log('une erreur a été détectée!')
            this.loaders = false;
        },
        () => {
            // // console.log('chargement des pannes');
            this.loaders = false;
            // // console.log("test007: "+this.dah)
        }) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);

    }
    SoldeTontine() {
        // this.soldeTontine = 0;
        this.dashboardService.getSolde().subscribe(
            data => {
                this.soldeTontine = data.solde;

            } ,
            error => {
                // // console.log('une erreur solde tontine observée!')
                this.loaders = false;
            },
            () => {
                // // console.log('solde tontine', this.soldeTontine);
                this.loaders = false;
            }
        );
    }

    SoldeAmande() {
        // this.soldeAmande = 0;
        this.amandeService.getSolde().subscribe(
            data => {
                this.soldeAmande = data.solde;

            } ,
            error => {
                // // console.log('erreur solde amande détectée!')
                this.loaders = false;
            },
            () => {
                // // console.log('solde amande ', this.soldeAmande);
                this.loaders = false;
            }
        );
    }

    SoldeMangwa() {
        // this.soldeMangwa = 0;
        this.retenueServices.getSolde().subscribe(
            data => {
                this.soldeMangwa = data.solde;

            } ,
            error => {
                // // console.log('erreur solde mangwa a été détectée!')
                this.loaders = false;
            },
            () => {
                // // console.log('solde mangwa ', this.soldeMangwa);
                this.loaders = false;
            }
        );
    }

    Planing(){

        this.loade = true;
        this.planingServices.getPlaning('').subscribe(
            data => {
                this.planings = data;

            } ,
            error => {
                // // console.log('une erreur sur planing a été détectée!')
                this.loade = false;
            },
            () => {
                this.loade = false;
                // // console.log("Planing: ",this.planings);
            }
        );
    }

    Reunion(){
        this.reuniongServices.getReunion().subscribe(
            data => {
                this.date_creation_reunion = data ? data.date : '';
                this.fondateur_reunion = data ? data.fondateur : '';
                // // console.log('info réunion', data);
            } ,
            error => {
                // // console.log('une erreur sur infos réunion!')
                this.loaders = false;
            },
            () => {
                this.loaders = false;

            }
        );
    }

    SessionActive(){
        this.sessionServices.getActiveSession().subscribe(
            data => {
                this.activeSession = data;
                // // console.log('session active', this.activeSession);

            } ,
            error => {
                // // console.log('une erreur sur la session active')
                this.loaders = false;
            },
            () => {
                this.loaders = false;
            }
        );
    }

    CountUsers(){
        this.bureauService.getBureau().subscribe(
            data => {
                this.countUser = data ? data.length : 0;

            } ,
            error => {
                // // console.log('une erreur sur planing a été détectée!')
                this.loaders = false;
            },
            () => {
                this.loaders = false;
            }
        );
    }

    dashLastMonth(){
      this.datas.labels = [];
      this.datas.datasets = [];
      this.loaders = true;
        this.dah = 0;
        const dat = new Date();
        const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()-1), 'MMM');
        const x = dat.getMonth() == 1 ? this.datePipe.transform(dat.setFullYear(dat.getFullYear()-1), 'yyyy') : this.datePipe.transform(dat.setFullYear(dat.getFullYear()), 'yyyy')
        // // console.log('last Month: '+ dat1);
        this.per_dash = dat1+" "+x;
    const datasetNbrePanne3 = {
        data: [],
        label: "Panne",
        yAxisID: 'y-axis-0',
        backgroundColor: 'red',
        borderColor: '#0692fb',
    };
    const datasetNbrePanne4 = {
        data: [],
        label: "Total Down Time",
        yAxisID: 'y-axis-1',
        type: 'line'
    };
    this.dashboardService.getCountDashLastPannes().subscribe(
        list => list.forEach(mach => {
            // datasetNbrePanne2.name = (mach.machine);
            this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
            this.dah = this.datas.labels.length;
            // // console.log("test007: "+this.dah)
            datasetNbrePanne3.data.push(mach.nbre);
            datasetNbrePanne4.data.push(mach.dt);this.loaders = false
        } ),
        error => {
            // // console.log('une erreur a été détectée!')
            this.loaders = false;
        },
        () => {
            // // console.log('chargement des pannes');
            this.loaders = false;
            // // console.log("test007: "+this.dah)
        }) ;
    this.datas.datasets.push(datasetNbrePanne3);
    this.datas.datasets.push(datasetNbrePanne4);

    }

    dashThisMonth(){
        this.datas.labels = [];
        this.datas.datasets = [];
        this.loaders = true;
        this.dah = 0;
        const dat = new Date();
        const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()), 'MMM yyyy');
        this.per_dash = dat1;
        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-0',
            backgroundColor: 'red',
            borderColor: '#0692fb',
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        this.dashboardService.getCountDashThisPannes().subscribe(
            list => list.forEach(mach => {

                // datasetNbrePanne2.name = (mach.machine);
                this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
                this.dah = this.datas.labels.length;
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.dt);
                // this.loaders = false;

            } ),
            error => {
                // // console.log('une erreur a été détectée!')
                this.loaders = false;
            },
            () => {
                // // console.log('chargement des pannes');
                this.loaders = false;
                // // console.log("test007: "+this.dah)
            }) ;
        this.datas.datasets.push(datasetNbrePanne3);
        this.datas.datasets.push(datasetNbrePanne4);

    }

    dashRange(){
        this.datas.labels = [];
        this.datas.datasets = [];this.dah = 0;
        this.loaders = true

        const datasetNbrePanne3 = {
            data: [],
            label: "Panne",
            yAxisID: 'y-axis-0',
            backgroundColor: 'red',
            borderColor: '#0692fb',
        };
        const datasetNbrePanne4 = {
            data: [],
            label: "Total Down Time",
            yAxisID: 'y-axis-1',
            type: 'line'
        };
        // // console.log('rien');
        const d1 = this.rangeForm.controls['date1'].value;
        const d2 = this.rangeForm.controls['date2'].value;

        // // console.log(d1 + ' et '+ d2);
        this.per_dash = d1 + ' au '+ d2;
        this.dashboardService.getCountRangePannes(d1, d2).subscribe(
            list => list.forEach(mach => {
                // this.dah = list.length;
                // datasetNbrePanne2.name = (mach.machine);
                this.datas.labels.push(this.datePipe.transform(mach.date, 'dd-MMM'));
                this.dah = this.datas.labels.length;
                datasetNbrePanne3.data.push(mach.nbre);
                datasetNbrePanne4.data.push(mach.dt);
                // this.loaders = false
                this.loaders = false
            } ),
            error => {
                // // console.log('une erreur a été détectée!')
                this.loaders = false;
            },
            () => {
                // // console.log('chargement des pannes');
                this.loaders = false;
                // // console.log("test007: "+this.dah)
            }) ;
        this.datas.datasets.push(datasetNbrePanne3);
        this.datas.datasets.push(datasetNbrePanne4);

    }

    //modal
    open(content){
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) =>{
                this.closeResult = `Closed with: ${result}`;
            }, (reason) =>{

            }
        );
    }

    modal(content){
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'xl'}).result.then((result) =>{
                this.closeResult = `Closed with: ${result}`;
            }, (reason) =>{

            }
        );
    }


    radialBar(){


    this.dashboardService.recapMonths().subscribe(

        data => {
            this.recapMonthFailure = data;

        },
        error => {
            // // console.log('une erreur a été détectée!')
        },
        () => {
            // // console.log('Total');
            // // console.log(this.cdount);
        }
    );



    }


    countThisYear(){
        this.mini_loader = true
    this.dashboardService.CountThisYear().subscribe(
        data => {
            this.nbreThisYear = data;
            this.mini_loader = false
        },
        error => {
            this.mini_loader = false
        },
        () =>{}
    );

    this.dashboardService.CountPastMonth().subscribe(
        datas => {
            this.nbreLastMonth = datas;
            this.lastMonth = 0;
            for (let mach of this.nbreLastMonth){
                this.lastMonth = this.lastMonth + mach.nbre;
            }
        }
    )
}


    loadPannes(){
        this.periode_panne = "toutes les pannes" ;
        this.loader = true;
        this.pannes = [];
        this.panneService.getAllPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                for (let pin of data){
                    this.selectedPanne.numero = pin.numero;
                }
                this.loader = false;
            },
            error => {
                // // console.log('une erreur a été détectée!')
                this.loader = false;
            },
            () => {
                // // console.log('chargement des pannes');
                // // console.log(this.pannes);
            }
        );


    }

//     ThisWeekPanne(){
//
//     this.panneService.getThisWeekPannes().subscribe(
//         data => {
//             this.ThisWeekPannes = data;
//             this.countPannes = data.length;
//             // this.rowData = data;
//         },
//         error => {
//             // // console.log('une erreur a été détectée!')
//         },
//         () => {
//             // // console.log('panne cette semaine');
//             // // console.log(this.ThisWeekPannes);
//         }
//     );
// }

    loadTimePannes(){
        this.panneService.getTimePannes().subscribe(
            data => {
                this.times = data;
                this.tails = this.times.length;
                for (let pin of data){
                    this.selectedPanne.heureArret = pin.heureArret;
                }

            }
        );
    }

    loadTechPannes(){

        this.panneService.getTechPannes(this.selectedPanne.numero).subscribe(
            data => {
                this.Tpannes = data;
            },
            error => {
                // // console.log('une erreur a été détectée!')
            },
            () => {
                // // console.log('chargement des pannes Techniques');
                // // console.log(this.Tpannes);
            }
        );

        this.panneService.getOpPannes(this.selectedPanne.numero).subscribe(
            data => {
                this.Opannes = data;
                this.OP1 = data[0];

                (data.length>1)? this.OP2 = data[1] : this.OP2 = '';
            },
            error => {
                // // console.log('une erreur a été détectée!')
            },
            () => {
                // // console.log('chargement des pannes Techniques');
                // console.log(this.Opannes);
            }
        );

        this.panneService.getDetailsPannes(this.selectedPanne.numero).subscribe(
            data => {
                this.Detailspannes = data;
                this.cause1 = data[0].cause;
                this.desc1 = data[0].description;
                this.details1 = data[0].details;

                (data.length>1)? this.cause2 = data[1].cause : this.cause2 = '';
                (data.length>1)? this.desc2 = data[1].description : this.desc2 = '';
                (data.length>1)? this.details2 = data[1].details : this.details2 = '';
            },
            error => {
                // console.log('une erreur a été détectée!')
            },
            () => {
                // console.log('chargement des pannes Techniques');
                // console.log(this.Detailspannes);
            }
        );

        this.panneService.getOutilsPannes(this.selectedPanne.numero).subscribe(
            data => {
                this.Outilpannes = data;
                this.outil1 = data[0].outil;
                this.qte1 = data[0].qte;
                this.ref1 = data[0].ref;
                (data.length>1)? this.outil2 = data[1].outil : this.outil2 = '';
                (data.length>1)? this.qte2 = data[1].qte : this.qte2 = '';
                (data.length>1)? this.ref2 = data[1].ref : this.ref2 = '';
                //   this.outil2 = data[1].outil;
                // this.qte2 = data[1].qte;
                // this.ref2 = data[1].ref;

            },
            error => {
                // console.log('une erreur a été détectée!')
            },
            () => {
                // console.log('chargement des outils');
                // console.log(this.Outilpannes);
            }
        );

        this.panneService.getHeurePannes(this.selectedPanne.numero).subscribe(
            data => {
                this.Hpannes = data;
                this.tail = this.Hpannes.length;
                this.ha1 = data[0].heure_arret;
                this.di1 = data[0].debut_inter;
                this.fi1 = data[0].fin_inter;
                (data.length > 1)?this.ha2 = data[1].heure_arret: this.ha2  = '';
                (data.length > 1)?this.di2 = data[1].debut_inter: this.di2  = '';
                (data.length > 1)?this.fi2 = data[1].fin_inter: this.fi2  = '';
            },
            error => {
                // console.log('une erreur a été détectée!')
            },
            () => {
                // console.log('chargement des heures');
                // console.log(this.Hpannes);
                // console.log('longueur');
                // console.log(this.tail);
            }
        );
    }

    PanneToday(){
        this.loader = true;
        this.pannes = [];
        this.todatpannes = [];
        this.periode_panne = "pannes de la journée";
        this.panneService.getTodayPannes().subscribe(
            data => {
                this.todatpannes = data;
                this.todatpannesLength = data.length;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!');
                this.loader = false;
            },
            () => {
                // console.log('panne aujourd\'hui');
                // console.log(this.pannes);
            }
        );
    }

    TodayPannes(){
        this.loader = true;
        this.pannes = [];
        this.todatpannes = [];
        this.periode_panne = "pannes de la journée";
        this.panneService.getTodayPannes().subscribe(
            data => {
                this.pannes = data;
                this.todatpannesLength = data.length;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!');
                this.loader = false;
            },
            () => {
                // console.log('panne aujourd\'hui');
                // console.log(this.pannes);
            }
        );
    }

    HierPannes(){
        this.loader = true;
        this.pannes = [];
        this.periode_panne = "pannes d'hier";
        this.panneService.getHierPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!')
                this.loader = false;
            },
            () => {
                // console.log('panne hier');
                // console.log(this.pannes);
            }
        );
    }

    ThisWeekPannes(){
        this.loader = true;
        this.pannes = [];
        this.periode_panne = "pannes de la semaine";
        this.panneService.getThisWeekPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!')
                this.loader = false;
            },
            () => {
                // console.log('panne cette semaine');
                // console.log(this.pannes);
            }
        );
    }

    LastWeekPannes(){
        this.loader = true;
        this.pannes = [];
        this.periode_panne = "pannes de la semaine passée";
        this.panneService.getLastWeekPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!')
                this.loader = false;
            },
            () => {
                // console.log('panne aujourd\'hui');
                // console.log(this.pannes);
            }
        );
    }

    LastMonthPannes(){
        this.loader = true;
        this.pannes = [];
        const dat = new Date();
        const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()-1), 'MMMM');
        const x = dat.getMonth() == 1 ? this.datePipe.transform(dat.setFullYear(dat.getFullYear()-1), 'yyyy') : this.datePipe.transform(dat.setFullYear(dat.getFullYear()), 'yyyy')
        // console.log('last Month: '+ dat1);
        this.periode_panne = "pannes du mois de "+ dat1+" "+x;
        this.panneService.getLastMonthPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                this.loader = false
            },
            error => {
                // console.log('une erreur a été détectée!')
                this.loader = false
            },
            () => {
                // console.log('panne aujourd\'hui');
                // console.log(this.pannes);
            }
        );
    }

    ThisMonthPannes(){
        this.loader = true;
        this.pannes = [];
        const dat = new Date();
        const dat1 = this.datePipe.transform(dat.setMonth(dat.getMonth()), 'MMMM yyyy');
        // console.log('last Month: '+ dat1);
        this.periode_panne = "pannes du mois de "+ dat1;
        this.panneService.getThisMonthPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!')
                this.loader = false;
            },
            () => {
                // console.log('panne aujourd\'hui');
                // console.log(this.pannes);
            }
        );
    }

    LastYearPannes(){
        this.loader = true;
        this.pannes = [];
        const dat = new Date();
        const dat1 = this.datePipe.transform(dat.setFullYear(dat.getFullYear()-1), 'yyyy');
        // console.log('last Month: '+ dat1);
        this.periode_panne = "pannes de l'année "+ dat1;
        this.panneService.getLastYearPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!');
                this.loader = false;
            },
            () => {
                // console.log('panne aujourd\'hui');
                // console.log(this.pannes);
            }
        );
    }

    ThisYearPannes(){
        this.loader = true;
        this.pannes = [];
        const dat = new Date();
        const dat1 = this.datePipe.transform(dat.setFullYear(dat.getFullYear()), 'yyyy');
        // console.log('last Month: '+ dat1);
        this.periode_panne = "pannes de l'année "+ dat1;
        this.panneService.getThisYearPannes().subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!');
                this.loader = false;
            },
            () => {
                // console.log('panne aujourd\'hui');
                // console.log(this.pannes);
            }
        );
    }

    rangeDate(){
        // console.log('rien');
        const d1 = this.rangeForm.controls['date1'].value;
        const d2 = this.rangeForm.controls['date2'].value;
        this.periode_panne = "pannes du "+d1+" au "+d2 ;
        // console.log(d1 + ' et '+ d2);
        this.loader = true;
        this.pannes = [];
        this.panneService.getRangeDatePannes(d1, d2).subscribe(
            data => {
                this.pannes = data;
                this.countPannes = data.length;
                this.loader = false;
            },
            error => {
                // console.log('une erreur a été détectée!');
                this.loader = false;
            },
            () => {
                // console.log('panne range');
                // console.log(this.pannes);
            }
        );
    }

    showDepart(d: Departement){
        let url = btoa(d.idDepartement.toString());
        // console.log(d.idDepartement +' '+url);
        this.router.navigateByUrl("departements/"+url);
    }

    showMachine(m: Machine){
        let url = btoa(m.idM.toString());
        this.modalService.dismissAll();
        this.router.navigateByUrl("machines/"+url);
    }

    showMachines(m: Machine){
        let url = btoa(m.idMachine.toString());
        this.modalService.dismissAll();
        this.router.navigateByUrl("machines/"+url);
    }

    suiviJournalier($event){
        if (this.dashPanForm.controls['dashPeriode'].value == 'l30d'){
            this.last30days();
        }
        if (this.dashPanForm.controls['dashPeriode'].value == 'tmp'){
            this.dashThisMonth();
            this.countAllPannes()
            this.StatistiquesTechniciens();
            this.ThisMonthPannes();
        }
        if (this.dashPanForm.controls['dashPeriode'].value == 'lmp'){
            this.dashLastMonth();
            this.countAllLastMonthPannes();
            this.StatistiquesTechniciensLastMonth();
            this.LastMonthPannes();
        }
        if (this.dashPanForm.controls['dashPeriode'].value == 'pp'){
            this.ranger = "true";
        }
        else {
            this.ranger = "false";
        }
    }

    findSso($event){
        if (this.selectPanForm.controls['periode'].value == 'hp'){
            this.HierPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'ttesp'){
            this.loadPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'tp'){
            this.TodayPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'twp'){
            this.ThisWeekPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'lwp'){
            this.LastWeekPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'tmp'){
            this.ThisMonthPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'lmp'){
            this.LastMonthPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'typ'){
            this.ThisYearPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'lyp'){
            this.LastYearPannes();
        }
        if (this.selectPanForm.controls['periode'].value == 'pp'){
            this.ranges = "true";
        }
        else {
            this.ranges = "false";
        }
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

    loadBureau() {
        this.bureauService.getBureau().subscribe(
            data => {
                this.bureaux = data;
            },
            error => {
                // console.log('une erreur a été détectée au chargement des sessions!')
            },
            () => {
                // console.log('chargement des bureaux', this.bureaux);
            }
        );
    }
}
