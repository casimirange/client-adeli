import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmandesRoutingModule } from './amandes-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AmandesComponent} from "./amandes.component";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LaComponent } from './la/la.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [AmandesComponent, LaComponent],
    imports: [
        CommonModule,
        AmandesRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingBarModule,
        LayoutModule,
        NgxPaginationModule
    ]
})
export class AmandesModule { }
