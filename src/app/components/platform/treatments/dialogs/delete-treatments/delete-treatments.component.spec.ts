import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTreatmentsComponent } from './delete-treatments.component';

describe('DeleteTreatmentsComponent', () => {
  let component: DeleteTreatmentsComponent;
  let fixture: ComponentFixture<DeleteTreatmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTreatmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
