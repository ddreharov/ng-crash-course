import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-layout-wrapper>
      <router-outlet></router-outlet>
    </app-layout-wrapper>
  `,
})
export class AppComponent { }
