import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {BetService} from './bet.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') tabGroup;

  constructor(private betService: BetService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    this.betService.currentTab.next(tabChangeEvent.tab.textLabel);
  }

}
