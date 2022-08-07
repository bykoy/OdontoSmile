import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreatementsComponent } from './create-treatements.component';

describe('CreateTreatementsComponent', () => {
  let component: CreateTreatementsComponent;
  let fixture: ComponentFixture<CreateTreatementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTreatementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTreatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
