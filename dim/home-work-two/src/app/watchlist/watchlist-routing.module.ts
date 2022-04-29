import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistLayoutComponent } from './watchlist-layout/watchlist-layout.component';

const routes: Routes = [
  {
    path: '',
    component: WatchlistLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchlistRoutingModule { }
