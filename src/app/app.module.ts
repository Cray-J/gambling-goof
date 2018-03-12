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
import {EersteDivisieOverviewComponent} from './bets/eerste-divisie-overview/eerste-divisie-overview.component';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { KeysPipe } from './keys.pipe';
import {MinorPlaysComponent} from './bets/minor-plays/minor-plays.component';



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
    EersteDivisieOverviewComponent,
    KeysPipe,
    MinorPlaysComponent
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
  providers: [BetService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
