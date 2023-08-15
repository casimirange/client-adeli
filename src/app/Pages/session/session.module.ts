import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import {SessionComponent} from "./session.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {BaseLayoutComponent} from "../../users/base-layout/base-layout.component";
import { LsComponent } from './ls/ls.component';
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {LayoutModule} from "../../layout/layout.module";


@NgModule({
  declarations: [SessionComponent, LsComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    LoadingBarModule,
    LayoutModule
  ]
})
export class SessionModule { }
