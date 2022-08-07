import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTreatmentsComponent } from './update-treatments.component';

describe('UpdateTreatmentsComponent', () => {
  let component: UpdateTreatmentsComponent;
  let fixture: ComponentFixture<UpdateTreatmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTreatmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
