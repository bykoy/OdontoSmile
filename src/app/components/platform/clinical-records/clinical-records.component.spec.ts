import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalRecordsComponent } from './clinical-records.component';

describe('ClinicalRecordsComponent', () => {
  let component: ClinicalRecordsComponent;
  let fixture: ComponentFixture<ClinicalRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicalRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicalRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
