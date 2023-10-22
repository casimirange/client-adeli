import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {AmandesComponent} from "../amandes/amandes.component";
import {UseComponentComponent} from "./use-component.component";
import {LuComponent} from "./lu/lu.component";


const routes: Routes = [
  {
    path: '', component: LuComponent, children: [
      { path: '', redirectTo: 'dashboard/:id', pathMatch: 'full'},
      { path: 'dashboard/:id', component: UseComponentComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UseComponentRoutingModule { }
