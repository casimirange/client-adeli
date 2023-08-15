import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {AmandesComponent} from "../amandes/amandes.component";
import {DashboardComponent} from "./dashboard.component";
import {LdaComponent} from "./lda/lda.component";


const routes: Routes = [
  {
    path: '', component: LdaComponent, children: [
      { path: '', redirectTo: 'dash', pathMatch: 'full'},
      { path: 'dash', component: DashboardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
