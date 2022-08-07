import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavPlatformComponent } from './sidenav-platform.component';

describe('SidenavPlatformComponent', () => {
  let component: SidenavPlatformComponent;
  let fixture: ComponentFixture<SidenavPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
