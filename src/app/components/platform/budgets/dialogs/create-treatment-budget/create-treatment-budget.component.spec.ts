import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTreatmentBudgetComponent } from './create-treatment-budget.component';

describe('CreateTreatmentBudgetComponent', () => {
  let component: CreateTreatmentBudgetComponent;
  let fixture: ComponentFixture<CreateTreatmentBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTreatmentBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTreatmentBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
