import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {ParamsComponent} from "./params/params.component";
import {PageTitleComponent} from "./page-title/page-title.component";
import {AutocompleteLibModule} from "angular-ng-autocomplete";


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    ParamsComponent,
    PageTitleComponent
  ],
    exports: [
        ParamsComponent,
        FooterComponent,
        SidebarComponent,
        HeaderComponent,
        PageTitleComponent
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        AutocompleteLibModule
    ]
})
export class LayoutModule { }
