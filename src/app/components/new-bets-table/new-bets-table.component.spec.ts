import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBetsTableComponent } from './new-bets-table.component';

describe('NewBetsTableComponent', () => {
  let component: NewBetsTableComponent;
  let fixture: ComponentFixture<NewBetsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [NewBetsTableComponent]
});
    fixture = TestBed.createComponent(NewBetsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
