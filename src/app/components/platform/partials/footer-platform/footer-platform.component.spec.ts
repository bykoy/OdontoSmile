import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterPlatformComponent } from './footer-platform.component';

describe('FooterPlatformComponent', () => {
  let component: FooterPlatformComponent;
  let fixture: ComponentFixture<FooterPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
