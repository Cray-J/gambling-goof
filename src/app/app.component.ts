import { Component, OnInit } from '@angular/core';
import {BetService} from './core/bet.service';
import { animate, state, style, transition, trigger } from "@angular/animations";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('one', style({
        transform: 'translate3d(-100%, 0, 0)',
        backgroundColor: 'green',
      })),
      state('two', style({
        transform: 'translate3d(-200%, 0, 0)',
        backgroundColor: 'red',
      })),
      state('three', style({
        transform: 'translate3d(-300%, 0, 0)',
        backgroundColor: 'blue',
      })),
      state('four', style({
        transform: 'translate3d(0%, 0, 0)',
        backgroundColor: 'pink',
      })),
      transition('* => *', animate('400ms ease-in-out')),
    ]),
  ]
})
export class AppComponent implements OnInit {

  menuState1: string = 'one';
  menuState2: string = 'two';
  menuState3: string = 'three';
  menuState4: string = 'four';

  constructor(private betService: BetService) {}

  ngOnInit() {
    this.betService.fetchSingleBets();
  }

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState1 = this.determineResult(this.menuState1);
    this.menuState2 = this.determineResult(this.menuState2);
    this.menuState3 = this.determineResult(this.menuState3);
    this.menuState4 = this.determineResult(this.menuState4);
    //this.menuState1 = this.menuState1 === 'out' ? 'in' : 'out';
    //this.menuState2 = this.menuState2 === 'out' ? 'in' : 'out';
  }

  private determineResult(currState: string) {
    if (currState === 'one') {
      return 'three';
    } else if (currState === 'two') {
      return 'one'
    } else if (currState === 'three') {
      return 'four';
    } else if (currState === 'four') {
      return 'two';
    }
    return 'one';
  }
}

