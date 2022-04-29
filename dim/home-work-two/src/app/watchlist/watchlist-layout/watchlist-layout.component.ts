import { Component } from '@angular/core';
import { WatchlistService } from '../../core/services/watchlist/watchlist.service';

@Component({
  selector: 'app-watchlist-layout',
  templateUrl: './watchlist-layout.component.html',
  styleUrls: ['./watchlist-layout.component.scss']
})
export class WatchlistLayoutComponent  {
  currencies$ = this.watchlistService.list$;
  constructor(private watchlistService: WatchlistService) { }
}
