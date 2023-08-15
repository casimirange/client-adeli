import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotisationsRoutingModule } from './cotisations-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CotisationComponent} from "./cotisation.component";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LcoComponent } from './lco/lco.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [CotisationComponent, LcoComponent],
    imports: [
        CommonModule,
        CotisationsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        LoadingBarModule,
        LayoutModule,
        Ng2SearchPipeModule,
        NgxPaginationModule
    ]
})
export class CotisationsModule { }
