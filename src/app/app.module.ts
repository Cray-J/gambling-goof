import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './navigation/header/header.component';
import {MaterialModule} from './material.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';
import {StatsComponent} from './stats/stats.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {environment} from '../environments/environment';
import {NewBetDialogComponent} from './bets/new-bet-dialog/new-bet-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {BankComponent} from './bank/bank.component';
import {BetsModule} from './bets/bets.module';
import { MenuAnimationComponent } from "./menu-animation/menu-animation.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SidenavListComponent,
    StatsComponent,
    BankComponent,
    MenuAnimationComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule,
    ChartsModule,
    BetsModule
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewBetDialogComponent],
})
export class AppModule { }
