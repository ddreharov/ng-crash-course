import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CryptoRoutingModule } from './crypto-routing.module';
import { CryptoLayoutComponent } from './crypto-layout/crypto-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CryptoLayoutComponent
  ],
  imports: [
    CommonModule,
    CryptoRoutingModule,
    SharedModule
  ]
})
export class CryptoModule { }
