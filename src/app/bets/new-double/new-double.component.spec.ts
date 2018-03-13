import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDoubleComponent } from './new-double.component';

describe('NewDoubleComponent', () => {
  let component: NewDoubleComponent;
  let fixture: ComponentFixture<NewDoubleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDoubleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
