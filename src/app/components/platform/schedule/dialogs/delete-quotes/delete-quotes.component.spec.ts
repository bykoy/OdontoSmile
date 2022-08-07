import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuotesComponent } from './delete-quotes.component';

describe('DeleteQuotesComponent', () => {
  let component: DeleteQuotesComponent;
  let fixture: ComponentFixture<DeleteQuotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteQuotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
