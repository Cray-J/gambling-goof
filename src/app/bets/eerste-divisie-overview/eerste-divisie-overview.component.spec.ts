import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EersteDivisieOverviewComponent } from './eerste-divisie-overview.component';

describe('EersteDivisieOverviewComponent', () => {
  let component: EersteDivisieOverviewComponent;
  let fixture: ComponentFixture<EersteDivisieOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EersteDivisieOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EersteDivisieOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
