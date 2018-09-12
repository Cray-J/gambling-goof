import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {BetService} from './bet.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') tabGroup;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }
}
