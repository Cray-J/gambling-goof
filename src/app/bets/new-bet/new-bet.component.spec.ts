import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBetComponent } from './new-bet.component';

describe('NewBetComponent', () => {
  let component: NewBetComponent;
  let fixture: ComponentFixture<NewBetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
