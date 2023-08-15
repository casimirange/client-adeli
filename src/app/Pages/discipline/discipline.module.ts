import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplineRoutingModule } from './discipline-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DisciplineComponent} from "./discipline.component";
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import {LdiComponent} from "./ldi/ldi.component";
// import {AppModule} from "../../app.module";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [DisciplineComponent, LdiComponent],
    imports: [
        CommonModule,
        DisciplineRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingBarModule,
        LayoutModule,
        NgxPaginationModule
    ]
})
export class DisciplineModule { }
