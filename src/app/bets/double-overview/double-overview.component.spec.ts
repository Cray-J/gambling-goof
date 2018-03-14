import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleOverviewComponent } from './double-overview.component';

describe('DoubleOverviewComponent', () => {
  let component: DoubleOverviewComponent;
  let fixture: ComponentFixture<DoubleOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoubleOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoubleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
