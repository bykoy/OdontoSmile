import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDentistComponent } from './update-dentist.component';

describe('UpdateDentistComponent', () => {
  let component: UpdateDentistComponent;
  let fixture: ComponentFixture<UpdateDentistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDentistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDentistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
