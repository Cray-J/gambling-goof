import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Bet } from '../bet.model';
import { BetService } from '../bet.service';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'app-new-bet',
  templateUrl: './new-bet.component.html',
  styleUrls: ['./new-bet.component.css']
})
export class NewBetComponent implements OnInit {
  bets: Bet[] = [];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private betService: BetService) { }

  ngOnInit() {
  }

  onNewBet(form: NgForm) {
    console.log(form);
    this.betService.addBet(form.value);
    console.log(this.betService.getBets());
    form.reset();
  }

}
