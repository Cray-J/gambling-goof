import { Component, OnInit } from '@angular/core';
import {BetService} from './core/bet.service';
import { animate, state, style, transition, trigger } from "@angular/animations";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(-300%, 0, 0)',
        backgroundColor: 'green',
      })),
      state('out', style({
        transform: 'translate3d(-150%, 0, 0)',
        backgroundColor: 'red',
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('300ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit {

  menuState1: string = 'out';
  menuState2: string = 'in';

  constructor(private betService: BetService) {}

  ngOnInit() {
    this.betService.fetchSingleBets();
  }

  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState1 = this.menuState1 === 'out' ? 'in' : 'out';
    this.menuState2 = this.menuState2 === 'out' ? 'in' : 'out';
  }
}
