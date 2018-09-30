import {Component, ViewChild} from '@angular/core';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html'
})
export class BetsComponent {

  @ViewChild('tabGroup') tabGroup;

  constructor() { }
}
