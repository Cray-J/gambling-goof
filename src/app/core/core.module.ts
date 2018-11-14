import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BetService} from './bet.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    BetService
  ]
})
export class CoreModule { }
