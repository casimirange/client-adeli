import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {AmandesComponent} from "../amandes/amandes.component";
import {CompteRenduComponent} from "./compte-rendu.component";
import {LcrComponent} from "./lcr/lcr.component";


const routes: Routes = [
  {
    path: '', component: LcrComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: CompteRenduComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompteRenduRoutingModule { }
