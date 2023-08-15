import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PretsRoutingModule } from './prets-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PretsComponent} from "./prets.component";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LprComponent } from './lpr/lpr.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [PretsComponent, LprComponent],
    imports: [
        CommonModule,
        PretsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingBarModule,
        LayoutModule,
        NgxPaginationModule
    ]
})
export class PretsModule { }
