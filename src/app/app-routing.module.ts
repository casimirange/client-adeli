import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DepartementsComponent} from "./Pages/departements/departements.component";
import {PannesComponent} from "./Pages/arrets/pannes/pannes.component";
import {NewPanneComponent} from "./Pages/arrets/pannes/new-panne/new-panne.component";
import {Erreur404Component} from "./layout/erreur404/erreur404.component";
import {AppComponent} from "./app.component";
import {SingleDepartementComponent} from "./Pages/departements/single-departement/single-departement.component";
import {DepartementResolver} from "./Pages/departements/departement.resolver";
import {LignesComponent} from "./Pages/lignes/lignes.component";
import {SingleLigneComponent} from "./Pages/lignes/single-ligne/single-ligne.component";
import {TechniciensComponent} from "./Pages/technicien/techniciens.component";
import {SingleTechnicienComponent} from "./Pages/technicien/single-technicien/single-technicien.component";
import {MachinesComponent} from "./Pages/machines/machines.component";
import {SingleMachineComponent} from './Pages/machines/single-machine/single-machine.component';
import {OperateursComponent} from "./Pages/operateurs/operateurs.component";
import {SingleOperateurComponent} from "./Pages/operateurs/single-operateur/single-operateur.component";
import {BaseLayoutComponent} from "./layout/base-layout/base-layout.component";
// import {LoginComponent} from "./Pages/auth/logins/logins.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
 import {UserComponent} from "./users/user.component";
import {PaddingLayoutComponent} from "./layout/base-layout/padding-layout/padding-layout.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {SinglePanneComponent} from "./Pages/arrets/pannes/single-panne/single-panne.component";
import {DashboardComponent} from "./Pages/dashboard/dashboard.component";
import {ArretsComponent} from "./Pages/arrets/arrets/arrets.component";
import {HeuresMachinesComponent} from "./Pages/heures/heures-machines/heures-machines.component";
import {StatsGlobalComponent} from "./Pages/stats-global/stats-global.component";

import {PmComponent} from "./pm/pm.component";
import {AdminComponent} from "./admin/admin.component";
import {RegisterComponent} from "./register/register.component";

import {LoginComponent} from "./logins/logins.component";
import {HomeComponent} from "./home/home.component";
import {RadialBarComponent} from "./dashboard/radial-bar/radial-bar.component";
import {ApexComponent} from "./dashboard/apexchart/apex.component";
import {EditPanneComponent} from "./Pages/arrets/pannes/edit-panne/edit-panne.component";
import {CotisationComponent} from "./Pages/cotisations/cotisation.component";
import {MangwaComponent} from "./Pages/mangwa/mangwa.component";
import {PretsComponent} from "./Pages/prets/prets.component";
import {AmandesComponent} from "./Pages/amandes/amandes.component";
import {EvenementsComponent} from "./Pages/evenements/evenements.component";
import {BureauComponent} from "./Pages/bureau/bureau.component";
import {CompteRenduComponent} from "./Pages/compte-rendu/compte-rendu.component";
import {DisciplineComponent} from "./Pages/discipline/discipline.component";
import {CommuniqueComponent} from "./Pages/communique/communique.component";
import {ProjetsComponent} from "./Pages/projets/projets.component";
import {SessionComponent} from "./Pages/session/session.component";
import {ReunionComponent} from "./Pages/reunion/reunion.component";
import {PlanningComponent} from "./Pages/planning/planning.component";
import {UseComponentComponent} from "./Pages/use-component/use-component.component";

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth/login',  loadChildren: () => import('./logins/login.module').then(m => m.LoginModule)

  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate:[AuthGuardService],
    children: [

  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService] },
  {path: 'utilisateurs', canActivate:[AuthGuardService], component: UserComponent },
  {path: 'cotisations', canActivate:[AuthGuardService], component: CotisationComponent },
  {path: 'mangwa', canActivate:[AuthGuardService], component: MangwaComponent },
  {path: 'prêts', canActivate:[AuthGuardService], component: PretsComponent },
  {path: 'amandes', canActivate:[AuthGuardService], component: AmandesComponent },
  {path: 'evenements', canActivate:[AuthGuardService], component: EvenementsComponent },
  {path: 'bureau', canActivate:[AuthGuardService], component: BureauComponent },
  {path: 'compte_rendu', canActivate:[AuthGuardService], component: CompteRenduComponent },
  {path: 'discipline', canActivate:[AuthGuardService], component: DisciplineComponent },
  {path: 'communiqué', canActivate:[AuthGuardService], component: CommuniqueComponent },
  {path: 'projets', canActivate:[AuthGuardService], component: ProjetsComponent  },
  {path: 'session', canActivate:[AuthGuardService], component: SessionComponent  },
  {path: 'reunion', canActivate:[AuthGuardService], component: ReunionComponent  },
  {path: 'planning', canActivate:[AuthGuardService], component: PlanningComponent  },

    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [

  // {path: 'logins', component: LoginComponent },
  {path: 'erreur', component: Erreur404Component }

    ]
  },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: '/erreur'}
];

@NgModule({
  imports: [RouterModule.forRoot(
      routes,
      {
        enableTracing: false,
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      } //pour avoir le suivi des routes dans la console
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
