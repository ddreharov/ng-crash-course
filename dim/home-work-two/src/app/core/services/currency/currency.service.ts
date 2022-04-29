import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../utils/api-url.token';
import { Currency, CurrencyDto } from './currency.interface';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private currencyStore = new BehaviorSubject<Currency[]>([])
  public currencyStore$ = this.currencyStore.asObservable();

  constructor(
    @Inject(API_URL) private apiUrl: string,
    private httpClient: HttpClient
  ) { }

  public getAllCurrencies(): Observable<Currency[]> {
    return this.httpClient.get<CurrencyDto>(`${this.apiUrl}/exchanges`).pipe(
      map(response => response.data),
      tap((currenciesList) => (this.currencyStore.next(currenciesList)))
    )
  }
}
