import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Erreur404RoutingModule } from './erreur404-routing.module';
import {Erreur404Component} from "./erreur404.component";
import {AuthLayoutComponent} from "../auth-layout/auth-layout.component";


@NgModule({
  declarations: [
    Erreur404Component,
    AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    Erreur404RoutingModule
  ]
})
export class Erreur404Module { }
