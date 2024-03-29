import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {AmandesComponent} from "../amandes/amandes.component";
import {PlanningComponent} from "./planning.component";
import {LpComponent} from "./lp/lp.component";


const routes: Routes = [
  {
    path: '', component: LpComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: PlanningComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanningRoutingModule { }
