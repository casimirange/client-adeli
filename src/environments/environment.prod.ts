const url = 'https://adeli-server.herokuapp.com';
export const environment = {
  production: true,
  // api_url: 'https://acon-stats-server.herokuapp.com',


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


  DEPARTEMENT_URL: url + '/api/departements',
  LIGNE_URL: url + '/api/lignes',
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
