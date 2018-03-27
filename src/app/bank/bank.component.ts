import { Component, OnInit } from '@angular/core';
import { BankService } from '../bank.service';
import { Bank } from '../bets/bank.model';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  bank: Bank;

  constructor(private bankService: BankService) { }

  ngOnInit() {
  }

  getBookies() {
    console.log(this.bankService.getBookies());
    return this.bankService.getBookies().bookies;
  }

}
