import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UseComponentRoutingModule } from './use-component-routing.module';
import {UseComponentComponent} from "./use-component.component";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LuComponent } from './lu/lu.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";


@NgModule({
  declarations: [UseComponentComponent, LuComponent],
  imports: [
    CommonModule,
    UseComponentRoutingModule,
    LoadingBarModule,
    LayoutModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class UseComponentModule { }
