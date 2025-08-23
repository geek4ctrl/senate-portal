import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SenateOriginMapComponent } from './features/map/senate-origin-map/senate-origin-map.component';


const routes: Routes = [
  {
    path: 'map',
    loadComponent: () =>
      import('./features/map/senate-origin-map/senate-origin-map.component')
        .then(m => m.SenateOriginMapComponent),
  },
  { path: '', pathMatch: 'full', redirectTo: 'map' },
  { path: '**', redirectTo: 'map' },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    HighchartsChartModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
