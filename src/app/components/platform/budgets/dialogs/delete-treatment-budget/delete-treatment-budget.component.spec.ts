import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTreatmentBudgetComponent } from './delete-treatment-budget.component';

describe('DeleteTreatmentBudgetComponent', () => {
  let component: DeleteTreatmentBudgetComponent;
  let fixture: ComponentFixture<DeleteTreatmentBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTreatmentBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTreatmentBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
