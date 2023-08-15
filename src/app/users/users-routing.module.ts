import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "./base-layout/base-layout.component";
import {AmandesComponent} from "../Pages/amandes/amandes.component";
import {UserComponent} from "./user.component";


const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: UserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
