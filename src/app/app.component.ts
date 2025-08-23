import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <header style="padding:12px; border-bottom:1px solid #e5e7eb;">
      <h1 style="margin:0; font-size:18px;">Senate Origins Portal</h1>
      <nav><a routerLink="/map" routerLinkActive="active">Map</a></nav>
    </header>
    <main><router-outlet></router-outlet></main>
  `,
})
export class AppComponent {
  title = 'senate-portal';
}
