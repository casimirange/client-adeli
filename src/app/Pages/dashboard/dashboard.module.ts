import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import {DashboardComponent} from "./dashboard.component";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LdaComponent } from './lda/lda.component';
import {LayoutModule} from "../../layout/layout.module";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {ChartComponent} from "../../dashboard/chart/chart.component";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  declarations: [DashboardComponent, LdaComponent, ChartComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutModule,
    LoadingBarModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class DashboardModule { }
