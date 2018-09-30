import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BetsComponent } from './bets/bets.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: '', component: BetsComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'bets', component: BetsComponent },
  { path: 'stats', component: StatsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

