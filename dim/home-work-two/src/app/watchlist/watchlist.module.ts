import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WatchlistRoutingModule } from './watchlist-routing.module';
import { SharedModule } from '../shared/shared.module';
import { WatchlistLayoutComponent } from './watchlist-layout/watchlist-layout.component';


@NgModule({
  declarations: [
    WatchlistLayoutComponent
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    SharedModule
  ]
})
export class WatchlistModule { }
