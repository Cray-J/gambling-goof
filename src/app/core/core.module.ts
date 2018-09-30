import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BankService} from './bank.service';
import {BetService} from './bet.service';
import {CalculationsService} from './calculations.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BankService,
    BetService,
    CalculationsService
  ]
})
export class CoreModule { }
