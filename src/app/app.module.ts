import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/header/header.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { BetsComponent } from './bets/bets.component';
import { StatsComponent } from './stats/stats.component';
import { NewBetComponent } from './bets/new-bet/new-bet.component';
import { BetService } from './bets/bet.service';
import { BetsOverviewComponent } from './bets/bets-overview/bets-overview.component';
import {DatePipe} from '@angular/common';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { KeysPipe } from './keys.pipe';
import {NewDoubleComponent} from "./bets/new-double/new-double.component";
import {NewBetDialogComponent} from "./bets/new-bet-dialog/new-bet-dialog.component";
import {MinorPlaysComponent} from './bets/minor-plays/minor-plays.component';
import { CalculationsService } from './bets/calculations.service';
import { DoubleOverviewComponent } from './bets/double-overview/double-overview.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SidenavListComponent,
    BetsComponent,
    StatsComponent,
    NewBetComponent,
    BetsOverviewComponent,
    KeysPipe,
    NewDoubleComponent,
    NewBetDialogComponent,
    MinorPlaysComponent,
    DoubleOverviewComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [BetService, DatePipe, CalculationsService],
  bootstrap: [AppComponent],
  entryComponents: [NewBetDialogComponent],
})
export class AppModule { }
