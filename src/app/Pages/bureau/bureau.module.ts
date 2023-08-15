import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BureauRoutingModule } from './bureau-routing.module';
import {BureauComponent} from "./bureau.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
// import {AppModule} from "../../app.module";
import { LbComponent } from './lb/lb.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  declarations: [BureauComponent, LbComponent],
    imports: [
        CommonModule,
        BureauRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingBarModule,
        LayoutModule,
        NgxPaginationModule,
        Ng2SearchPipeModule
    ]
})
export class BureauModule { }
