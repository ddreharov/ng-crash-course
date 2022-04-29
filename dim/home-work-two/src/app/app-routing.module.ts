import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'crypto',
    loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule)
  },
  {
    path: 'watchlist',
    loadChildren: () => import('./watchlist/watchlist.module').then(m => m.WatchlistModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
