import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BetsComponent } from './bets/bets.component';

const routes: Routes = [
  { path: '', redirectTo: 'bets', pathMatch: 'full' },
  { path: 'bets', component: BetsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}

