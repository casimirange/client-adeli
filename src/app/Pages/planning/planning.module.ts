import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanningRoutingModule } from './planning-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlanningComponent} from "./planning.component";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LpComponent } from './lp/lp.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [PlanningComponent, LpComponent],
    imports: [
        CommonModule,
        PlanningRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingBarModule,
        LayoutModule,
        NgxPaginationModule
    ]
})
export class PlanningModule { }
