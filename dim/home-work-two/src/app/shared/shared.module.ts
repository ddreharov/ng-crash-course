import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyTableComponent } from './currency-table/currency-table.component';


@NgModule({
  declarations: [
    CurrencyTableComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CurrencyTableComponent
  ]
})
export class SharedModule { }
