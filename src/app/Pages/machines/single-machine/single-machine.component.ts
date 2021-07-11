import { Component, OnInit } from '@angular/core';
// import {Machine} from "../../../Models/machines";
// import {MachinesService} from "../../../services/machines/machines.service";
// import {ActivatedRoute, Router} from "@angular/router";
// import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
// import {TokenStorageService} from "../../../auth/token-storage.service";
// import {FormBuilder, FormGroup} from "@angular/forms";
// import {DatePipe} from "@angular/common";
// import {UserService} from "../../../services/user/user.service";
// import {User} from "../../../Models/users";
@Component({
  selector: 'app-single-machine',
  templateUrl: './single-machine.component.html',
  styleUrls: ['./single-machine.component.css']
})
export class SingleMachineComponent  {
  // heading = "dep";
  // subheading = 'Retrouvez la fiche historique de ce membre ADELI';
  // icon = 'fa fa-home icon-gradient';
  // bg = 'text-white bg-midnight-bloom';
  //
  // term: string;
  // p: number;
  // div: boolean;
  // selectedUser: User;
  // rangeForm: FormGroup;
  // pageForm: FormGroup;
  // ranger:string = "false";
  // noms:string ;
  // pages:number = 7;
  // public url: any;
  // tail: number;
  // closeResult: any;
  //
  // hourThisMonth: any;
  // hourLastMonth: any;
  //
  //
  // constructor(private userService: UserService,
  //             private modalService: NgbModal,
  //             private fb: FormBuilder,
  //             private datePipe: DatePipe,
  //             private router: Router,
  //             private tokenStorage: TokenStorageService,
  //             private _location: Location,
  //             private route: ActivatedRoute) {
  //   this.selectedUser = new User();
  //   // this.selectedPanne = new Pannes();
  //   //   this.createForm();
  //   //   this.createForms();
  //   //   this.rangeForms();
  //   //   this.pageForms();
  // }
  //
  // ngOnInit() {
  //   // this.route.params.subscribe(params => {
  //   //   this.url = atob(params['id']);
  //   // });
  //   this.showMachine();
  // }
  //
  //   pageForms() {
  //       this.pageForm = this.fb.group({
  //           page: ['']
  //       });
  //   }
  //
  //   rangeForms() {
  //       this.rangeForm = this.fb.group({
  //           date1: [''],
  //           date2: ['']
  //       });
  //   }
  //
  // showMachine() {
  //     console.log('test')
  //     // this.route.params.subscribe(params => {
  //     //     // let urls = atob(params['id']);
  //     //     this.noms = '';
  //     //     this.userService.getUser(Number.parseInt(params['id'])).subscribe(
  //     //         res => {
  //     //             this.selectedUser = res;
  //     //             this.noms = this.selectedUser.name;
  //     //         }
  //     //     )
  //     // })
  // }
  //
  // historiquePannes(){
  //   //   this.loaders = true
  //   //   this.periode_panne = "toutes les pannes" ;
  //   // this.machineService.historiquePannes(Number.parseInt(this.url)).subscribe(
  //   //     res => {
  //   //       this.pannes = res;
  //   //         this.loaders = false
  //   //         this.countPannes = res.length;
  //   //     },
  //   //     error => {
  //   //         this.loaders = false
  //   //     },
  //   //     () => {
  //   //
  //   //     }
  //   // )
  // }
  //
  //
  //
  //   findSso($event){
  //       // if (this.selectPanForm.controls['periode'].value == 'hp'){
  //       //     this.HierPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'ttesp'){
  //       //     this.historiquePannes();
  //       //     // this.countAllPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'tp'){
  //       //     this.TodayPannes();
  //       //     // this.countTodayPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'twp'){
  //       //     this.ThisWeekPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'lwp'){
  //       //     this.LastWeekPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'tmp'){
  //       //     this.ThisMonthPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'lmp'){
  //       //     this.LastMonthPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'typ'){
  //       //     this.ThisYearPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'lyp'){
  //       //     this.LastYearPannes();
  //       // }
  //       // if (this.selectPanForm.controls['periode'].value == 'pp'){
  //       //     this.ranger = "true";
  //       // }
  //       // else {
  //       //     this.ranger = "false";
  //       // }
  //   }
  //
  //   paginate($event){
  //       if (this.pageForm.controls['page'].value == '10'){
  //           this.pages = 10;
  //       }
  //       if (this.pageForm.controls['page'].value == '25'){
  //           this.pages = 25;
  //       }
  //       if (this.pageForm.controls['page'].value == '50'){
  //           this.pages = 50;
  //       }
  //       if (this.pageForm.controls['page'].value == '100'){
  //           this.pages = 100;
  //       }
  //       if (this.pageForm.controls['page'].value == '1000'){
  //           this.pages = 1000;
  //       }
  //   }
}
