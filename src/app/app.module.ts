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
import { BetService } from './bets/bet.service';
import { BetsOverviewComponent } from './bets/bets-overview/bets-overview.component';
import { DatePipe } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { KeysPipe } from './keys.pipe';
import { NewBetComponent } from './bets/new-bet/new-bet.component';
import { NewBetDialogComponent } from './bets/new-bet-dialog/new-bet-dialog.component';
import { CalculationsService } from './bets/calculations.service';
import { DoubleOverviewComponent } from './bets/double-overview/double-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { TableBasicExample } from './test/table-basic-example';
import { BankComponent } from './bank/bank.component';
import { BankService } from './bank.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SidenavListComponent,
    BetsComponent,
    StatsComponent,
    BetsOverviewComponent,
    KeysPipe,
    NewBetComponent,
    NewBetDialogComponent,
    DoubleOverviewComponent,
    TableBasicExample,
    BankComponent
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
    ChartsModule
  ],
  providers: [BetService, DatePipe, CalculationsService, BankService],
  bootstrap: [AppComponent],
  entryComponents: [NewBetDialogComponent],
})
export class AppModule { }
