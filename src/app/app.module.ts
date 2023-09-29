import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BetsModule } from './bets/bets.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule, Routes } from "@angular/router";
import { BetsComponent } from "./bets/bets.component";
import { AngularFireModule } from "@angular/fire/compat";
import { NewBetsTableComponent } from './bets/new-bets-table/new-bets-table.component';
// import firebase from "firebase/compat";
// import Firestore = firebase.firestore.Firestore;

const routes: Routes = [
  { path: '', redirectTo: 'bets', pathMatch: 'full' },
  { path: 'bets', component: BetsComponent }
];

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    // AngularFireAuthModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    // ChartsModule,
    BetsModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}



// Your web app's Firebase configuration


// Initialize Firebase
