import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompteRenduRoutingModule } from './compte-rendu-routing.module';
import {CompteRenduComponent} from "./compte-rendu.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {LcrComponent} from "./lcr/lcr.component";
import {LayoutModule} from "../../layout/layout.module";
import {LoadingBarModule} from "@ngx-loading-bar/core";


@NgModule({
  declarations: [CompteRenduComponent, LcrComponent],
  imports: [
    CommonModule,
    CompteRenduRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    LoadingBarModule
  ]
})
export class CompteRenduModule { }
