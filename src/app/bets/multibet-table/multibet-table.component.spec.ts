import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultibetTableComponent } from './multibet-table.component';

describe('MultibetTableComponent', () => {
  let component: MultibetTableComponent;
  let fixture: ComponentFixture<MultibetTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultibetTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultibetTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
