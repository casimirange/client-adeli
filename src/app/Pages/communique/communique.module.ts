import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommuniqueRoutingModule } from './communique-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommuniqueComponent} from "./communique.component";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LcComponent } from './lc/lc.component';
import {LayoutModule} from "../../layout/layout.module";
import {LoadingBarModule} from "@ngx-loading-bar/core";


@NgModule({
  declarations: [CommuniqueComponent, LcComponent],
  imports: [
    CommonModule,
    CommuniqueRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutModule,
    LoadingBarModule
  ]
})
export class CommuniqueModule { }
