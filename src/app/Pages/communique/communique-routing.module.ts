import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {AmandesComponent} from "../amandes/amandes.component";
import {CommuniqueComponent} from "./communique.component";
import {LcComponent} from "./lc/lc.component";


const routes: Routes = [
  {
    path: '', component: LcComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: CommuniqueComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommuniqueRoutingModule { }
