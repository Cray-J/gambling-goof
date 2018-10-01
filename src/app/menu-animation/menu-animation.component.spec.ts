import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAnimationComponent } from './menu-animation.component';

describe('MenuAnimationComponent', () => {
  let component: MenuAnimationComponent;
  let fixture: ComponentFixture<MenuAnimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAnimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
