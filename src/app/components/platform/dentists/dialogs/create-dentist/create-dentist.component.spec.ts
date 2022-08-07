import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDentistComponent } from './create-dentist.component';

describe('CreateDentistComponent', () => {
  let component: CreateDentistComponent;
  let fixture: ComponentFixture<CreateDentistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDentistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDentistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
