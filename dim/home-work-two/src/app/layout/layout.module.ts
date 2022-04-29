import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { LayoutWrapperComponent } from './layout-wrapper/layout-wrapper.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LayoutWrapperComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    LayoutWrapperComponent
  ]
})
export class LayoutModule { }
