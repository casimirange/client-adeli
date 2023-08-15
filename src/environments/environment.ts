// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// const url = 'http://localhost:8080';
const url = 'http://54.37.12.6:8081/ServeurADELI-0.0.1-SNAPSHOT';
export const environment = {

  production: false,
  TONTINE_URL: url + '/admin/tontine',
  AMANDE_URL: url + '/admin/amandes',
  RETENUE_URL: url + '/api/retenue',
  PLANING_URL: url + '/api/planing',
  REUNION_URL: url + '/admin/reunion',
  SESSION_URL: url + '/admin/session',
  COMPTE_RENDU_URL: url + '/admin/compteRendu',
  COMMUNIQUE_URL: url + '/admin/communique',
  DISCIPLINE_URL: url + '/admin/discipline',
  PRET_URL: url + '/admin/prets',
  BENEFICIAIRE_URL: url + '/admin/beneficiaire',
  NOTIFICATION_URL: url + '/admin/notification',
  ELECTION_URL: url + '/admin/elections',







  LIGNE_URL: url + '/api/lignes',
  DEPARTEMENT_URL: url + '/api/lignes',
  TECHNICIEN_URL: url + '/api/techniciens',
  OPERATEUR_URL: url + '/api/operateurs',
  MACHINE_URL: url + '/api/machines',
  PANNES_URL: url + '/api/pannes',
  ARRETS_URL: url + '/api/arrets',
  DASHBOARD_URL: url + '/api/dashboard',
  HEURES_URL: url + '/api/heures',

  USER_ROLE_URL: url + '/api/user',
  USERS_URL: url + '/crud_user',


  ROLES_URL: url + '/admin/role',
  ALPICAM_URL: url + '/admin/alpicam',
  RAPPORT_URL: url + '/admin/rapport',

  LOGIN_URL: url + '/api/auth/signin',
  SIGNUP_URL: url + '/api/auth/signup',
  URERS: url + '/api/auth',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
