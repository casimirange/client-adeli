import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import {UserComponent} from "./user.component";
import {BaseLayoutComponent} from "./base-layout/base-layout.component";
import {LayoutModule} from "../layout/layout.module";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {PaddingLayoutComponent} from "./base-layout/padding-layout/padding-layout.component";
import {TitleComponent} from "../layout/page-title/title/title.component";


@NgModule({
  declarations: [UserComponent, BaseLayoutComponent, PaddingLayoutComponent, TitleComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        LayoutModule,
        LoadingBarModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        Ng2SearchPipeModule
    ]
})
export class UsersModule { }
