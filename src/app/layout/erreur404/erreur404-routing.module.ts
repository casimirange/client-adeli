import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Erreur404Component} from "./erreur404.component";
import {AuthLayoutComponent} from "../auth-layout/auth-layout.component";


const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'not-found', pathMatch: 'full'},
      { path: 'not-found', component: Erreur404Component},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Erreur404RoutingModule { }
