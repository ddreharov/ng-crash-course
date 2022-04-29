import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoLayoutComponent } from './crypto-layout/crypto-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CryptoRoutingModule { }
