import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { DepartementsService } from "./services/departements/departements.service";
import { LignesService } from "./services/lignes/lignes.service";
import {TechniciensService} from "./services/techniciens/techniciens.service";
import {OperateursService} from "./services/operateurs/operateurs.service";
import {MachinesService} from "./services/machines/machines.service";
import { AgGridModule } from 'ag-grid-angular';
import {AuthService} from "./services/auth/auth.service";
import {UserService} from "./services/user/user.service";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {RoleService} from "./services/role/role.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {ChartModule} from "angular2-chartjs";
import {NgxDonutChartModule} from "ngx-doughnut-chart";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DashboardService} from "./services/dashboard/dashboard.service";
import {ChartsModule} from "ng2-charts";
import {ArretsService} from "./services/arrets/arrets.service";
import {HeuresService} from "./services/heures/heures.service";
// import {NgApexchartsModule} from "ng-apexcharts";
import {AuthInterceptor, httpInterceptorProviders} from "./services/auth/auth-interceptor";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {jqxGridModule} from "jqwidgets-ng/jqxgrid";
import { SearchComponent } from './search/search/search.component';
import {DatePipe} from "@angular/common";
import {RapportService} from "./services/rapport/rapport.service";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {MessageServiceService} from "./services/message-service.service";
import {RetenueService} from "./services/retenue/retenue.service";
import {PlaningService} from "./services/planing/planing.service";
import {ReunionService} from "./services/reunion/reunion.service";
import {SessionService} from "./services/session/session.service";
import {TontineService} from "./services/tontine/tontine.service";
import {BeneficiaireService} from "./services/beneficiaire/beneficiaire.service";
import {NotificationsService} from "./services/notifications/notifications.service";
import {AmandesService} from "./services/amandes/amandes.service";
import {PretService} from "./services/pret/pret.service";
import {CompteRenduService} from "./services/compte_rendu/compte-rendu.service";
import {CommuniqueService} from "./services/communique/communique.service";
import {DisciplineService} from "./services/discipline/discipline.service";
import {BureauService} from "./services/bureau/bureau.service";
import {LayoutModule} from "./layout/layout.module";
import {NgxPaginationModule} from "ngx-pagination";
import {Ng2SearchPipeModule} from "ng2-search-filter";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        LoadingBarRouterModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AgGridModule.withComponents([]),
        SweetAlert2Module.forRoot(),
        NgbModule,
        NgSelectModule,
        ChartModule,
        NgxDonutChartModule,
        NgxChartsModule,
        BrowserAnimationsModule,
        ChartsModule,
        // NgApexchartsModule,
        jqxGridModule,
        AutocompleteLibModule,
        LayoutModule,
        NgxPaginationModule,
        Ng2SearchPipeModule
    ],
  providers: [
    DepartementsService,
    LignesService,
    TechniciensService,
    OperateursService,
    MachinesService,
    CookieService,
    AuthService,
    UserService,
    RoleService,
    AuthGuardService,
    DashboardService,
    DatePipe,
    ArretsService,
    HeuresService,
    RapportService,
    MessageServiceService,
    httpInterceptorProviders,
    RetenueService,
    PlaningService,
    ReunionService,
    SessionService,
    TontineService,
    BeneficiaireService,
    NotificationsService,
    AmandesService,
    PretService,
    CompteRenduService,
    CommuniqueService,
    DisciplineService,
    BureauService

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [
    AppComponent,
  ],
  exports: [
  ]
})
export class AppModule { }
