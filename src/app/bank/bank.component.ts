import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from '../bets/bank.model';
import {Bookie} from '../bets/bookie.enum';
import {BetService} from '../bets/bet.service';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bank: Bank;

  constructor(private bankService: BankService) { }

  ngOnInit() {
    this.bank = this.bankService.getBookies();

  }

  getBookies() {
    return this.bank.bookies;
  }
}
