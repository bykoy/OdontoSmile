import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarPlatformComponent } from './navbar-platform.component';

describe('NavbarPlatformComponent', () => {
  let component: NavbarPlatformComponent;
  let fixture: ComponentFixture<NavbarPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
