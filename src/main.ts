import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { provideRouter, Routes } from '@angular/router';
import { environment as environment_1 } from './environments/environment.prod';
import { AngularFireModule } from '@angular/fire/compat';
import { withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { NewBetsTableComponent } from './app/components/new-bets-table/new-bets-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'bets', pathMatch: 'full' },
  { path: 'bets', component: NewBetsTableComponent }
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ButtonModule, FlexLayoutModule, AngularFireModule.initializeApp(environment.firebase)),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(routes)
    ]
})
  .catch(err => console.log(err));
