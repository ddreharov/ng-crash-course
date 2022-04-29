import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CurrencyService } from '../../core/services/currency/currency.service';
import { Currency } from '../../core/services/currency/currency.interface';
import { catchError, debounceTime, map, scan, skip, takeWhile, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, fromEvent, merge, Observable, of} from 'rxjs';
import { WatchlistService } from '../../core/services/watchlist/watchlist.service';

export interface SearchState {
  key: keyof Currency;
  value: string;
  sortBy: keyof Currency;
  isDesc: boolean;
}

@Component({
  selector: 'app-crypto-layout',
  templateUrl: './crypto-layout.component.html',
  styleUrls: ['./crypto-layout.component.scss']
})
export class CryptoLayoutComponent implements OnInit {
  @ViewChild('searchInput', {static: true})
  private searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('searchKeySelect', {static: true})
  private searchKeySelect: ElementRef<HTMLSelectElement>;
  @ViewChild('searchClearBtn', {static: true})
  private searchClearBtn: ElementRef<HTMLButtonElement>;
  private sortTrigger$ = new BehaviorSubject<Partial<SearchState>>({sortBy: undefined, isDesc: undefined});
  public loadError = false;
  public loading = true;
  public currencies$: Observable<Currency[]>;
  public searchOptions = [
    'name',
    'exchangeUrl',
    'rank'
  ];

  public selectedItems$ = this.watchlistService.store$;

  constructor(
    private currencyService: CurrencyService,
    private watchlistService: WatchlistService
  ) { }

  ngOnInit() {
    this.currencies$ = merge(
      this.bindSearchEvents(),
      this.currencyService.getAllCurrencies().pipe(
        tap(() => (this.loading = false)),
        catchError(() => {
          this.loadError = true;
          return of([])
        })
      )
    ).pipe(
      takeWhile(() => !this.loadError)
    );
  }

  private bindSearchEvents(): Observable<Currency[]> {
    return merge(
      fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
        debounceTime(200),
        map(event => ({value: (event.target as HTMLInputElement).value}))
      ),
      fromEvent(this.searchKeySelect.nativeElement, 'change').pipe(
        debounceTime(200),
        map(event => ({key: (event.target as HTMLSelectElement).value as keyof Currency}))
      ),
      fromEvent(this.searchClearBtn.nativeElement, 'click').pipe(
        map(() => ({key: undefined, value: undefined, sortBy: undefined})),
        tap(() => {
          this.searchInput.nativeElement.value = '';
          this.searchKeySelect.nativeElement.value = 'name' as keyof Currency;
        })
      ),
      this.sortTrigger$.pipe(
        skip(1)
      )
    ).pipe(
      scan<Partial<SearchState>, SearchState>((acc, value) => ({...acc, ...value})),
      withLatestFrom(this.currencyService.currencyStore$),
      map(([{key, value, sortBy, isDesc}, currenciesList]) => {
        key = key || 'name' as keyof Currency;


        if (!value && !sortBy) {
          return currenciesList;
        }

        let mapped = [...currenciesList];

        if (value) {
          mapped = currenciesList.filter(item => String(item[key]).toLowerCase().includes(value))
        }

        if (sortBy) {
          mapped.sort((a, b) => {
            if (isDesc) {
              [a, b] = [b, a]
            }

            return String(a[sortBy]).localeCompare(String(b[sortBy]));
          })
        }
        return mapped
      }),
    )
  }

  public onItemSelected(item: {selected: boolean, data: Currency}): void {
    if (!item.selected) {
      this.watchlistService.removeFromWatchList(item.data)
      return;
    }

    this.watchlistService.addToWatchList(item.data);
  }

  public onSortBy(sortBy: keyof Currency): void {
    const currentState = this.sortTrigger$.getValue();

    this.sortTrigger$.next({
      sortBy,
      isDesc: sortBy === currentState.sortBy ? !currentState.isDesc : false
    });
  }
}
