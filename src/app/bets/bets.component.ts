import {AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {BetService} from './bet.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit, AfterViewInit {
  @Output() betTypeSelected = new EventEmitter<void>();


  @ViewChild('tabGroup') tabGroup;

  constructor(private betService: BetService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log('afterViewInit => ', this.tabGroup.selectedIndex);
  }

  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    console.log(tabChangeEvent.tab.textLabel);
    this.betService.currentTab.next(tabChangeEvent.tab.textLabel);
  }

  updateSelectedBet(betType: string) {
    console.log('inside updateSelected');
    this.betService.currentSelectedBetType = betType;
    this.betService.currentSelectedBetTypeChanged.next(this.betService.currentSelectedBetType);
  }

}
