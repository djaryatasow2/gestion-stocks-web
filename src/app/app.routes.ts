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
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'dashboard', component: Dashboard },
  { path: 'articles', component: Articles },
  { path: 'categories', component: Categories },
  { path: 'entrepots', component: Entrepots },
  { path: 'entreprises', component: Entreprises },
  { path: 'utilisateurs', component: Utilisateurs },
  { path: 'historique', component: Historique },
  { path: 'alertes', component: Alertes },
  { path: 'previsions', component: Previsions },
  { path: 'rapports', component: Rapports },
  { path: 'profile', component: Profile },
  { path: '**', component: NotFound }
];