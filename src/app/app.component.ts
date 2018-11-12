import { Component, OnInit } from '@angular/core';
import { BetService } from './core/bet.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private betService: BetService) {}

  ngOnInit() {
    this.betService.fetchSingleBets();
  }
}

