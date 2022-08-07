/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotRoleComponent } from './not-role.component';

describe('NotRoleComponent', () => {
  let component: NotRoleComponent;
  let fixture: ComponentFixture<NotRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
