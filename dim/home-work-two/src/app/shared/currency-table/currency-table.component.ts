import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyColumn } from './currency-table.interface';
import { Currency } from '../../core/services/currency/currency.interface';


@Component({
  selector: 'app-currency-table',
  templateUrl: './currency-table.component.html'
})
export class CurrencyTableComponent {
  @Input()
  public items: Currency[] | null = [];
  @Input()
  public selectable: boolean = false;
  @Input()
  public selectedItems: any = new Map();
  @Output()
  private itemSelected = new EventEmitter<{selected: boolean; data: any}>();
  @Output()
  private sortBy = new EventEmitter<keyof Currency>();
  public columns: CurrencyColumn[] = [
    'name',
    'rank',
    'updated',
    'volumeUsd',
    'exchangeUrl'
  ];

  public onSelectItem(event: any, item: any): void {
    this.itemSelected.emit({
      selected: event.target.checked,
      data: item
    })
  }

  public onSortBy(columnName: keyof Currency): void {
    this.sortBy.emit(columnName);
  }
}
