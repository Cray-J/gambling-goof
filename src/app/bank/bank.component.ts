import { Component, OnInit } from '@angular/core';
import { BankService } from '../core/bank.service';
import { Bank } from '../shared/model/bank.model';

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
