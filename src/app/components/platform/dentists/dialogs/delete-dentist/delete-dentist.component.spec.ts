import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDentistComponent } from './delete-dentist.component';

describe('DeleteDentistComponent', () => {
  let component: DeleteDentistComponent;
  let fixture: ComponentFixture<DeleteDentistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDentistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDentistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
