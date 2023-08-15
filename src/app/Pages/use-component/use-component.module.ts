import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UseComponentRoutingModule } from './use-component-routing.module';
import {UseComponentComponent} from "./use-component.component";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LuComponent } from './lu/lu.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [UseComponentComponent, LuComponent],
  imports: [
    CommonModule,
    UseComponentRoutingModule,
    LoadingBarModule,
    LayoutModule
  ]
})
export class UseComponentModule { }
