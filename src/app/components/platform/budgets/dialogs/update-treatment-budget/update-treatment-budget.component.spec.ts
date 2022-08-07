import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTreatmentBudgetComponent } from './update-treatment-budget.component';

describe('UpdateTreatmentBudgetComponent', () => {
  let component: UpdateTreatmentBudgetComponent;
  let fixture: ComponentFixture<UpdateTreatmentBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTreatmentBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTreatmentBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
