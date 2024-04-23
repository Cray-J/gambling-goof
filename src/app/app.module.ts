import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from "@angular/router";
import { AngularFireModule } from "@angular/fire/compat";
import { ButtonModule } from 'primeng/button';
import { NewBetsTableComponent } from './bets/new-bets-table/new-bets-table.component';

const routes: Routes = [
  { path: '', redirectTo: 'bets', pathMatch: 'full' },
  { path: 'bets', component: NewBetsTableComponent }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ButtonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HeaderComponent,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
