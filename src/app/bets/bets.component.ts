import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'bets',
  templateUrl: './bets.component.html'
})
export class BetsComponent {
  @ViewChild('tabGroup') tabGroup;

  constructor() {}
}
