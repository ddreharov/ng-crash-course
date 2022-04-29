import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Currency } from '../currency/currency.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private store = new Map<Currency['exchangeId'], Currency>();
  private storeSubject = new BehaviorSubject<Map<Currency['exchangeId'], Currency>>(this.store)
  public store$ = this.storeSubject.asObservable();

  public list$ = this.store$.pipe(
    map(store => ([...store.values()]))
  );

  constructor() { }

  public addToWatchList(item: Currency) {
    if (this.store.has(item.exchangeId)) {
      return;
    }

    this.store.set(item.exchangeId, item);
    this.setValue();
  }

  public removeFromWatchList(item: Currency) {
    if (!this.store.has(item.exchangeId)) {
      return;
    }

    this.store.delete(item.exchangeId);
    this.setValue();
  }

  private setValue() {
    this.storeSubject.next(this.store)
  }
}
