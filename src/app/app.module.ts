import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { NewBetDialogComponent } from './bets/new-bet-dialog/new-bet-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';
import { BetsModule } from './bets/bets.module';
import { NewGoalDialogComponent } from './bets/new-goal-dialog/new-goal-dialog.component';
import { NewDayDialogComponent } from "./bets/new-day-dialog/new-day-dialog.component";
import { InventoryPageComponent } from "./bets/inventory-page/inventory-page.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
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
  entryComponents: [
    NewBetDialogComponent,
    NewDayDialogComponent,
    NewGoalDialogComponent
  ],
})
export class AppModule { }
