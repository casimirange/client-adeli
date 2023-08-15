import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {AmandesComponent} from "../amandes/amandes.component";
import {DisciplineComponent} from "./discipline.component";
import {LdiComponent} from "./ldi/ldi.component";


const routes: Routes = [
  {
    path: '', component: LdiComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DisciplineComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplineRoutingModule { }
