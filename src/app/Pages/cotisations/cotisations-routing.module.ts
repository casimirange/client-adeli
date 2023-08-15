import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {AmandesComponent} from "../amandes/amandes.component";
import {CotisationComponent} from "./cotisation.component";
import {LcoComponent} from "./lco/lco.component";


const routes: Routes = [
  {
    path: '', component: LcoComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: CotisationComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotisationsRoutingModule { }
