import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBetDialogComponent } from './new-bet-dialog.component';

describe('NewBetDialogComponent', () => {
  let component: NewBetDialogComponent;
  let fixture: ComponentFixture<NewBetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
