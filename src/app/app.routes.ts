import { accesosGuard } from './middleware/accesos.guard';
import { accessUserGuard } from './middleware/access-user.guard';
import { Routes } from '@angular/router';
import { urlMatcher } from '../app/utilities/urlmatcher';
import { ActivacionPage } from './pages/activacion/activacion.page';

export const routes: Routes = [
  {
    path: 'no-connection',
    loadComponent: () => import('./pages/no-connection/no-connection.page').then((m) => m.NoConnectionPage),
  },
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/inscriptions/inscriptions.page').then((m) => m.InscriptionsPage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'newlist',
    canActivate: [accessUserGuard],
    loadComponent: () => import('./pages/adminposted/adminposted.page').then((m) => m.AdminpostedPage),
  },
  {
    path: 'perfil',
    loadComponent: () => import('./pages/perfil/perfil.page').then((m) => m.PerfilPage),
  },
  {
    path: 'content',
    loadComponent: () => import('./pages/content/content.page').then((m) => m.ContentPage),
  },
  {
    path: 'adminlist',
    loadComponent: () => import('./pages/adminlist/adminlist.page').then((m) => m.AdminlistPage),
  },
  {
    path: 'recuperaracceso',
    loadComponent: () => import('./pages/recuperaracceso/recuperaracceso.page').then((m) => m.RecuperaraccesoPage),
  },
  {
    path: 'nuevopassword',
    canActivate: [accessUserGuard],
    loadComponent: () => import('./pages/nuevopassword/nuevopassword.page').then((m) => m.NuevopasswordPage),
  },
  {
    matcher: urlMatcher,
    loadComponent: () => import('./pages/activacion/activacion.page').then((m) => m.ActivacionPage),
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/error/error.page').then((m) => m.ErrorPage),
  },
  {
    path: 'listprofile',
    loadComponent: () => import('./pages/listprofile/listprofile.page').then((m) => m.ListprofilePage),
  },
  {
    path: 'listprofile',
    loadComponent: () => import('./pages/listprofile/listprofile.page').then((m) => m.ListprofilePage),
  },
  {
    path: 'searcher',
    loadComponent: () => import('./pages/searcher/searcher.page').then((m) => m.SearcherPage),
  },
  {
    path: 'tendencies',
    loadComponent: () => import('./pages/tendencies/tendencies.page').then((m) => m.TendenciesPage),
  },
   {
    path: 'viewtrends',
    loadComponent: () => import('./pages/viewtrends/viewtrends.page').then( m => m.ViewtrendsPage)
  },
  {
    path: '**',
    redirectTo: '/error?type=404',
  },
 
];
