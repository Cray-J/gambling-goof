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
import { KeysPipe } from './keys.pipe';



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
    KeysPipe
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [BetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
