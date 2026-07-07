import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Articles } from './pages/articles/articles';
import { Categories } from './pages/categories/categories';
import { Entrepots } from './pages/entrepots/entrepots';
import { Entreprises } from './pages/entreprises/entreprises';
import { Utilisateurs } from './pages/utilisateurs/utilisateurs';
import { Historique } from './pages/historique/historique';
import { Alertes } from './pages/alertes/alertes';
import { Previsions } from './pages/previsions/previsions';
import { Rapports } from './pages/rapports/rapports';
import { Profile } from './pages/profile/profile';
import { Mouvements } from './pages/mouvements/mouvements';
import { Inventaires } from './pages/inventaires/inventaires';
import { NotFound } from './pages/not-found/not-found';
import { authGuard, adminGuard, gestionnaireGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'alertes', component: Alertes, canActivate: [authGuard] },
  { path: 'historique', component: Historique, canActivate: [authGuard] },
  { path: 'entrepots', component: Entrepots, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'inventaires', component: Inventaires, canActivate: [authGuard] },
  { path: 'articles', component: Articles, canActivate: [gestionnaireGuard] },
  { path: 'categories', component: Categories, canActivate: [gestionnaireGuard] },
  { path: 'mouvements', component: Mouvements, canActivate: [gestionnaireGuard] },
  { path: 'previsions', component: Previsions, canActivate: [gestionnaireGuard] },
  { path: 'rapports', component: Rapports, canActivate: [gestionnaireGuard] },
  { path: 'entreprises', component: Entreprises, canActivate: [adminGuard] },
  { path: 'utilisateurs', component: Utilisateurs, canActivate: [adminGuard] },
  { path: '**', component: NotFound }
];