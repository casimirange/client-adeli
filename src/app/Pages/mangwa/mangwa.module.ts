import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MangwaRoutingModule } from './mangwa-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MangwaComponent} from "./mangwa.component";
import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LmComponent } from './lm/lm.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
// import {AppModule} from "../../app.module";
import {LayoutModule} from "../../layout/layout.module";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [MangwaComponent, LmComponent],
    imports: [
        CommonModule,
        MangwaRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingBarModule,
        LayoutModule,
        NgxPaginationModule
    ]
})
export class MangwaModule { }
