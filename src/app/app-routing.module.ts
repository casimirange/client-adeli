import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Erreur404Component} from "./layout/erreur404/erreur404.component";
import {AppComponent} from "./app.component";
// import {BaseLayoutComponent} from "./users/base-layout/base-layout.component";
// import {LoginComponent} from "./Pages/auth/logins/logins.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";
 import {UserComponent} from "./users/user.component";
import {PaddingLayoutComponent} from "./users/base-layout/padding-layout/padding-layout.component";
import {AuthGuardService} from "./services/auth-guard/auth-guard.service";
import {DashboardComponent} from "./Pages/dashboard/dashboard.component";
import {RegisterComponent} from "./register/register.component";

import {LoginComponent} from "./logins/logins.component";
// import {HomeComponent} from "./home/home.component";
// import {RadialBarComponent} from "./dashboard/radial-bar/radial-bar.component";
// import {ApexComponent} from "./dashboard/apexchart/apex.component";
import {CotisationComponent} from "./Pages/cotisations/cotisation.component";
import {MangwaComponent} from "./Pages/mangwa/mangwa.component";
import {PretsComponent} from "./Pages/prets/prets.component";
import {AmandesComponent} from "./Pages/amandes/amandes.component";
// import {EvenementsComponent} from "./Pages/evenements/evenements.component";
import {BureauComponent} from "./Pages/bureau/bureau.component";
import {CompteRenduComponent} from "./Pages/compte-rendu/compte-rendu.component";
import {DisciplineComponent} from "./Pages/discipline/discipline.component";
import {CommuniqueComponent} from "./Pages/communique/communique.component";
// import {ProjetsComponent} from "./Pages/projets/projets.component";
import {SessionComponent} from "./Pages/session/session.component";
// import {ReunionComponent} from "./Pages/reunion/reunion.component";
import {PlanningComponent} from "./Pages/planning/planning.component";
import {UseComponentComponent} from "./Pages/use-component/use-component.component";

const routes: Routes = [

  {    path: 'auth/login',  loadChildren: () => import('./logins/login.module').then(m => m.LoginModule)  },
  {    path: 'signup', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule),  canActivate:[AuthGuardService], },
  {    path: 'dashboard', loadChildren: () => import('./Pages/dashboard/dashboard.module').then(x => x.DashboardModule),  canActivate:[AuthGuardService], },
  {    path: 'utilisateurs', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),  canActivate:[AuthGuardService], },
  {    path: 'cotisations', loadChildren: () => import('./Pages/cotisations/cotisations.module').then(m => m.CotisationsModule),  canActivate:[AuthGuardService], },
  {    path: 'mangwa', loadChildren: () => import('./Pages/mangwa/mangwa.module').then(m => m.MangwaModule),  canActivate:[AuthGuardService], },
  {    path: 'prêts', loadChildren: () => import('./Pages/prets/prets.module').then(m => m.PretsModule),  canActivate:[AuthGuardService], },
  {    path: 'amandes', loadChildren: () => import('./Pages/amandes/amandes.module').then(m => m.AmandesModule),  canActivate:[AuthGuardService], },
  {    path: 'bureau', loadChildren: () => import('./Pages/bureau/bureau.module').then(m => m.BureauModule),  canActivate:[AuthGuardService], },
  {    path: 'compte_rendu', loadChildren: () => import('./Pages/compte-rendu/compte-rendu.module').then(m => m.CompteRenduModule),  canActivate:[AuthGuardService], },
  {    path: 'discipline', loadChildren: () => import('./Pages/discipline/discipline.module').then(m => m.DisciplineModule),  canActivate:[AuthGuardService], },
  {    path: 'communiqué', loadChildren: () => import('./Pages/communique/communique.module').then(m => m.CommuniqueModule),  canActivate:[AuthGuardService], },
  {    path: 'session', loadChildren: () => import('./Pages/session/session.module').then(m => m.SessionModule),  canActivate:[AuthGuardService], },
  {    path: 'planning', loadChildren: () => import('./Pages/planning/planning.module').then(m => m.PlanningModule),  canActivate:[AuthGuardService], },
  {    path: 'erreur', loadChildren: () => import('./layout/erreur404/erreur404.module').then(m => m.Erreur404Module) },
  // {
  //   path: '',
  //   component: BaseLayoutComponent,
  //   canActivate:[AuthGuardService],
  //   children: [

  // {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService] },
  // {path: 'utilisateurs', canActivate:[AuthGuardService], component: UserComponent },
  // {path: 'cotisations', canActivate:[AuthGuardService], component: CotisationComponent },
  // {path: 'mangwa', canActivate:[AuthGuardService], component: MangwaComponent },
  // {path: 'prêts', canActivate:[AuthGuardService], component: PretsComponent },
  // {path: 'amandes', canActivate:[AuthGuardService], component: AmandesComponent },
  // {path: 'bureau', canActivate:[AuthGuardService], component: BureauComponent },
  // {path: 'compte_rendu', canActivate:[AuthGuardService], component: CompteRenduComponent },
  // {path: 'discipline', canActivate:[AuthGuardService], component: DisciplineComponent },
  // {path: 'communiqué', canActivate:[AuthGuardService], component: CommuniqueComponent },
  // {path: 'session', canActivate:[AuthGuardService], component: SessionComponent  },
  // {path: 'planning', canActivate:[AuthGuardService], component: PlanningComponent  },

    // ]
  // },
  // {
  //   path: '',
  //   component: AuthLayoutComponent,
  //   children: [

  // {path: 'logins', component: LoginComponent },
  // {path: 'erreur', component: Erreur404Component }

    // ]
  // },
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
