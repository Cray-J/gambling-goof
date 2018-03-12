import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinorPlaysComponent } from './minor-plays.component';

describe('MinorPlaysComponent', () => {
  let component: MinorPlaysComponent;
  let fixture: ComponentFixture<MinorPlaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinorPlaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinorPlaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
