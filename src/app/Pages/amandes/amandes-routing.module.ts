import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {AmandesComponent} from "./amandes.component";
import {AuthGuardService} from "../../services/auth-guard/auth-guard.service";
import {LaComponent} from "./la/la.component";


const routes: Routes = [
  {
    path: '', component: LaComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: AmandesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AmandesRoutingModule { }
