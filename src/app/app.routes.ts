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
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
  { path: 'articles', component: Articles, canActivate: [authGuard] },
  { path: 'categories', component: Categories, canActivate: [authGuard] },
  { path: 'entrepots', component: Entrepots, canActivate: [authGuard] },
  { path: 'entreprises', component: Entreprises, canActivate: [authGuard] },
  { path: 'utilisateurs', component: Utilisateurs, canActivate: [authGuard] },
  { path: 'historique', component: Historique, canActivate: [authGuard] },
  { path: 'alertes', component: Alertes, canActivate: [authGuard] },
  { path: 'previsions', component: Previsions, canActivate: [authGuard] },
  { path: 'rapports', component: Rapports, canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'mouvements', component: Mouvements, canActivate: [authGuard] },
  { path: '**', component: NotFound }
];