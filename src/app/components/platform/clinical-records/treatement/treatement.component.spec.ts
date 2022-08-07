import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatementComponent } from './treatement.component';

describe('TreatementComponent', () => {
  let component: TreatementComponent;
  let fixture: ComponentFixture<TreatementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
